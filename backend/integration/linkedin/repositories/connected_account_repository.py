from datetime import datetime

from sqlalchemy.orm import Session

from integration.linkedin.config.constants import LINKEDIN_INTEGRATION_NAME
from database.models.connected_account import ConnectedAccount, ProviderType


def get_connected_account(db: Session, user_id: int) -> ConnectedAccount | None:
    return (
        db.query(ConnectedAccount)
        .filter(
            ConnectedAccount.user_id == user_id,
            ConnectedAccount.provider == ProviderType.LINKEDIN,
            ConnectedAccount.integration_name == LINKEDIN_INTEGRATION_NAME,
        )
        .first()
    )


def upsert_connected_account(
    db: Session,
    user_id: int,
    access_token: str,
    refresh_token: str | None,
    scopes: str,
    expires_at: datetime | None,
) -> ConnectedAccount:
    account = get_connected_account(db, user_id)

    if account is None:
        account = ConnectedAccount(
            user_id=user_id,
            provider=ProviderType.LINKEDIN,
            integration_name=LINKEDIN_INTEGRATION_NAME,
        )
        db.add(account)

    account.access_token = access_token
    account.refresh_token = refresh_token
    account.scopes = scopes
    account.expires_at = expires_at

    db.commit()
    db.refresh(account)
    return account


def delete_connected_account(db: Session, user_id: int) -> None:
    account = get_connected_account(db, user_id)
    if account is not None:
        db.delete(account)
        db.commit()