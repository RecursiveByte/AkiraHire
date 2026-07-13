
import secrets
from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from database.models.connected_account import (
    ConnectedAccount,
    ProviderType,
)
from database.models.oauth_state import OAuthState


class ConnectedAccountRepository:
    
    
    @staticmethod
    def get_connected_accounts_by_user_id(
        db: Session,
        user_id: int,
    ) -> list[ConnectedAccount]:
        
        return (
            db.query(ConnectedAccount)
            .filter(
                ConnectedAccount.user_id == user_id,
            )
            .all()
        )
        
    @staticmethod
    def get_by_id_and_user(
        db: Session,
        account_id: int,
        user_id: int,
    ) -> ConnectedAccount | None:
        return (
            db.query(ConnectedAccount)
            .filter(
                ConnectedAccount.id == account_id,
                ConnectedAccount.user_id == user_id,
            )
            .first()
        )

    @staticmethod
    def get_connected_account(
        db: Session,
        user_id: int,
        provider: ProviderType,
        integration_name: str,
    ) -> ConnectedAccount | None:

        return (
            db.query(ConnectedAccount)
            .filter(
                ConnectedAccount.user_id == user_id,
                ConnectedAccount.provider == provider,
                ConnectedAccount.integration_name == integration_name,
            )
            .first()
        )

    @staticmethod
    def save(
        db: Session,
        account: ConnectedAccount,
    ) -> ConnectedAccount:

        db.add(account)
        db.commit()
        db.refresh(account)

        return account

    @staticmethod
    def update(
        db: Session,
        account: ConnectedAccount,
    ) -> ConnectedAccount:

        db.commit()
        db.refresh(account)

        return account

    @staticmethod
    def delete(
        db: Session,
        account: ConnectedAccount,
    ) -> None:

        db.delete(account)
        db.commit()

    @staticmethod
    def save_oauth_state(
        db: Session,
        user_id: int,
    ) -> str:

        state = secrets.token_urlsafe(32)

        record = OAuthState(
            state=state,
            user_id=user_id,
        )

        db.add(record)
        db.commit()

        return state

    @staticmethod
    def pop_oauth_state(
        db: Session,
        state: str,
        max_age_seconds: int = 600,
    ) -> int | None:

        record = (
            db.query(OAuthState)
            .filter(OAuthState.state == state)
            .first()
        )

        if record is None:
            return None

        db.delete(record)
        db.commit()

        age = (
            datetime.now(timezone.utc)
            - record.created_at.replace(tzinfo=timezone.utc)
        )

        if age > timedelta(seconds=max_age_seconds):
            return None

        return record.user_id