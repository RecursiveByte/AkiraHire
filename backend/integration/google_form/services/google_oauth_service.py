from datetime import datetime, timezone

from google.auth.transport.requests import Request as GoogleRequest
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from sqlalchemy.orm import Session

from integration.google_form.constants.google import SCOPES
from integration.google_form.config.google_oauth import CLIENT_CONFIG
from integration.google_form.config.settings import settings

from integration.connected_account_repository import (
    ConnectedAccountRepository,
)

from integration.google_form.exceptions.oauth_exceptions import (
    GoogleNotConnectedError,
    GoogleOAuthSessionExpiredError,
    GoogleTokenRefreshError,
)

from database.models.connected_account import (
    ConnectedAccount,
    ProviderType,
)


class GoogleOAuthService:

    @staticmethod
    def create_google_auth_url(user_id: int, db: Session) -> tuple[str, str]:

        flow = Flow.from_client_config(
            CLIENT_CONFIG,
            scopes=SCOPES,
            redirect_uri=settings.GOOGLE_FORM_CALLBACK_URI,
        )

        state = ConnectedAccountRepository.save_oauth_state(db=db, user_id=user_id)

        auth_url, _ = flow.authorization_url(
            access_type="offline",
            prompt="consent",
            state=state,
        )

        return auth_url, flow.code_verifier

    @staticmethod
    def exchange_code_for_tokens(
        code: str,
        code_verifier: str,
    ) -> Credentials:

        flow = Flow.from_client_config(
            CLIENT_CONFIG,
            scopes=SCOPES,
            redirect_uri=settings.GOOGLE_FORM_CALLBACK_URI,
        )

        flow.code_verifier = code_verifier

        flow.fetch_token(
            code=code,
        )

        return flow.credentials

    @staticmethod
    def save_google_credentials(
        db: Session,
        user_id: int,
        creds: Credentials,
        integration_name: str = "google_forms",
    ) -> None:

        account = ConnectedAccountRepository.get_connected_account(
            db=db,
            user_id=user_id,
            provider=ProviderType.GOOGLE,
            integration_name=integration_name,
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
                integration_name=integration_name,
                access_token=creds.token,
                refresh_token=creds.refresh_token,
                scopes=",".join(creds.scopes or []),
                expires_at=expires_at,
            )

            ConnectedAccountRepository.save(
                db=db,
                account=account,
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

        ConnectedAccountRepository.update(
            db=db,
            account=account,
        )

    @staticmethod
    def get_google_credentials(
        user_id: int,
        db: Session,
        integration_name: str = "google_forms",
    ) -> Credentials:

        account = ConnectedAccountRepository.get_connected_account(
            db=db,
            user_id=user_id,
            provider=ProviderType.GOOGLE,
            integration_name=integration_name,
        )

        if account is None:
            raise GoogleNotConnectedError()

        token_data = {
            "token": account.access_token,
            "refresh_token": account.refresh_token,
            "token_uri": "https://oauth2.googleapis.com/token",
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
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

                    GoogleOAuthService.save_google_credentials(
                        db=db,
                        user_id=user_id,
                        creds=creds,
                        integration_name=integration_name,
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


    def handle_oauth_callback(
        db: Session,
        code: str,
        state: str,
        code_verifier: str | None,
    ) -> None:

        if code_verifier is None:
            raise GoogleOAuthSessionExpiredError()

        user_id = ConnectedAccountRepository.pop_oauth_state(db=db, state=state)

        if user_id is None:
            raise GoogleOAuthSessionExpiredError()

        credentials = GoogleOAuthService.exchange_code_for_tokens(
            code=code,
            code_verifier=code_verifier,
        )

        GoogleOAuthService.save_google_credentials(
            db=db,
            user_id=user_id,
            creds=credentials,
        )