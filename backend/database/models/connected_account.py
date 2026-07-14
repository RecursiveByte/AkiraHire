from datetime import datetime, timezone
import enum

from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from database.base import Base


class ProviderType(str, enum.Enum):
    LINKEDIN = "linkedin"
    GOOGLE = "google"


class ConnectedAccount(Base):
    __tablename__ = "connected_accounts"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    provider = Column(
        Enum(ProviderType),
        nullable=False,
        index=True,
    )

    integration_name = Column(
        String,
        nullable=False,
        index=True,
    )

    access_token = Column(
        String,
        nullable=False,
    )

    refresh_token = Column(
        String,
        nullable=True,
    )

    scopes = Column(
        String,
        nullable=False,
    )

    expires_at = Column(
        DateTime(timezone=True),
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
    )

    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "provider",
            "integration_name",
            name="uq_user_provider_integration",
        ),
    )

    user = relationship(
        "User",
        back_populates="connected_accounts",
    )

    linkedin_identity = relationship(
        "LinkedInIdentity",
        back_populates="connected_account",
        cascade="all, delete-orphan",
        uselist=False,
    )