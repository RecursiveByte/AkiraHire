"""
Repository for ConnectedAccount database operations.
"""

from sqlalchemy.orm import Session

from database.models.connected_account import (
    ConnectedAccount,
    ProviderType,
)


def get_connected_account(
    db: Session,
    user_id: int,
    provider: ProviderType,
    integration_name: str,
) -> ConnectedAccount | None:
    """
    Fetch a connected account for a user.
    """

    return (
        db.query(ConnectedAccount)
        .filter(
            ConnectedAccount.user_id == user_id,
            ConnectedAccount.provider == provider,
            ConnectedAccount.integration_name == integration_name,
        )
        .first()
    )


def save(db: Session, account: ConnectedAccount) -> ConnectedAccount:
    """
    Save a new ConnectedAccount.
    """

    db.add(account)
    db.commit()
    db.refresh(account)

    return account


def update(db: Session, account: ConnectedAccount) -> ConnectedAccount:
    """
    Persist changes made to an existing ConnectedAccount.
    """

    db.commit()
    db.refresh(account)

    return account


def delete(db: Session, account: ConnectedAccount) -> None:
    """
    Delete a ConnectedAccount.
    """

    db.delete(account)
    db.commit()