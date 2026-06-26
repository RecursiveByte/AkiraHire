"""
Business logic for Google OAuth.
"""

from datetime import datetime, timezone

from google.auth.transport.requests import Request as GoogleRequest
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from sqlalchemy.orm import Session

from agents.google_form_agent.config.google_oauth import CLIENT_CONFIG
from agents.google_form_agent.config.settings import (
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
)

from agents.google_form_agent.constants.google import SCOPES

from agents.google_form_agent.repositories.connected_account_repository import (
    get_connected_account,
    save,
    update,
)

from agents.google_form_agent.exceptions.oauth_exceptions import (
    GoogleNotConnectedError,
    GoogleTokenRefreshError,
)

from database.models.connected_account import (
    ConnectedAccount,
    ProviderType,
)


def create_google_auth_url(
    user_id: int,
) -> tuple[str, str]:
    """
    Create the Google OAuth authorization URL.
    """

    flow = Flow.from_client_config(
        CLIENT_CONFIG,
        scopes=SCOPES,
        redirect_uri=GOOGLE_REDIRECT_URI,
    )

    auth_url, _ = flow.authorization_url(
        access_type="offline",
        prompt="consent",
        state=str(user_id),
    )

    return auth_url, flow.code_verifier


def exchange_code_for_tokens(
    code: str,
    code_verifier: str,
) -> Credentials:
    """
    Exchange an authorization code for Google credentials.
    """

    flow = Flow.from_client_config(
        CLIENT_CONFIG,
        scopes=SCOPES,
        redirect_uri=GOOGLE_REDIRECT_URI,
    )

    flow.code_verifier = code_verifier

    flow.fetch_token(
        code=code,
    )

    return flow.credentials


def save_google_credentials(
    db: Session,
    user_id: int,
    creds: Credentials,
    agent_name: str = "google_forms_agent",
) -> None:
    """
    Save or update Google OAuth credentials.
    """

    account = get_connected_account(
        db=db,
        user_id=user_id,
        provider=ProviderType.GOOGLE,
        agent_name=agent_name,
    )

    expires_at = None

    if creds.expiry:
        expires_at = creds.expiry.replace(
            tzinfo=timezone.utc,
        )

    if account is None:

        account = ConnectedAccount(
            user_id=user_id,
            provider=ProviderType.GOOGLE,
            agent_name=agent_name,
            access_token=creds.token,
            refresh_token=creds.refresh_token,
            scopes=",".join(creds.scopes or []),
            expires_at=expires_at,
        )

        save(
            db,
            account,
        )

        return

    account.access_token = creds.token

    if creds.refresh_token:
        account.refresh_token = creds.refresh_token

    account.scopes = ",".join(
        creds.scopes or [],
    )

    account.expires_at = expires_at

    account.updated_at = datetime.now(
        timezone.utc,
    )

    update(
        db,
        account,
    )


def get_google_credentials(
    user_id: int,
    db: Session,
    agent_name: str = "google_forms_agent",
) -> Credentials:
    """
    Load Google credentials and refresh them if needed.
    """

    account = get_connected_account(
        db=db,
        user_id=user_id,
        provider=ProviderType.GOOGLE,
        agent_name=agent_name,
    )

    if account is None:

        raise GoogleNotConnectedError(
            "Google account is not connected."
        )

    token_data = {
        "token": account.access_token,
        "refresh_token": account.refresh_token,
        "token_uri": "https://oauth2.googleapis.com/token",
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "scopes": (
            account.scopes.split(",")
            if account.scopes
            else SCOPES
        ),
    }

    creds = Credentials.from_authorized_user_info(
        token_data,
        SCOPES,
    )

    if not creds.valid:

        if creds.expired and creds.refresh_token:

            try:

                creds.refresh(
                    GoogleRequest(),
                )

                save_google_credentials(
                    db=db,
                    user_id=user_id,
                    creds=creds,
                    agent_name=agent_name,
                )

            except Exception as e:

                raise GoogleTokenRefreshError(
                    "Failed to refresh Google credentials."
                ) from e

        else:

            raise GoogleNotConnectedError(
                "Google account is not connected."
            )

    return creds