from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from integration.linkedin.clients import linkedin_client
from integration.linkedin.exceptions.linkedin_exceptions import (
    LinkedInNotConnectedError,
    LinkedInTokenExpiredError,
)
from integration.linkedin.repositories import (
    connected_account_repository,
    linkedin_identity_repository,
)


def get_authorization_url() -> str:
    return linkedin_client.build_authorization_url()

def handle_oauth_callback(db: Session, user_id: int, code: str) -> None:
    token_data = linkedin_client.exchange_code_for_token(code)

    access_token = token_data["access_token"]
    refresh_token = token_data.get("refresh_token")
    expires_in = token_data.get("expires_in")
    scopes = token_data.get("scope", "")

    expires_at = (
        datetime.now(timezone.utc) + timedelta(seconds=expires_in)
        if expires_in is not None
        else None
    )

    account = connected_account_repository.upsert_connected_account(
        db=db,
        user_id=user_id,
        access_token=access_token,
        refresh_token=refresh_token,
        scopes=scopes,
        expires_at=expires_at,
    )

    userinfo = linkedin_client.fetch_userinfo(access_token)
    person_urn = f"urn:li:person:{userinfo['sub']}"

    linkedin_identity_repository.upsert_identity(
        db=db,
        connected_account_id=account.id,
        person_urn=person_urn,
    )


def get_active_connection(db: Session, user_id: int) -> tuple[str, str]:
    account = connected_account_repository.get_connected_account(db, user_id)

    if account is None:
        raise LinkedInNotConnectedError(user_id)

    if account.expires_at is not None and account.expires_at <= datetime.now(timezone.utc):
        raise LinkedInTokenExpiredError(user_id)

    identity = linkedin_identity_repository.get_by_connected_account_id(db, account.id)

    if identity is None:
        raise LinkedInNotConnectedError(user_id)

    return account.access_token, identity.person_urn