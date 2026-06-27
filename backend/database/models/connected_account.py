from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from database.base import Base
import enum

from sqlalchemy import Enum

class ProviderType(str, enum.Enum):
    LINKEDIN = "linkedin"
    GOOGLE = "google"


class ConnectedAccount(Base):
    __tablename__ = "connected_accounts"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)

    provider = Column(Enum(ProviderType), nullable=False, index=True)
    agent_name = Column(String, nullable=False, index=True)

    access_token = Column(String, nullable=False)
    refresh_token = Column(String, nullable=True)

    scopes = Column(String, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "provider",
            "agent_name",
            name="uq_user_provider_agent",
        ),
    )

    user = relationship(
        "User",
        back_populates="connected_accounts",
    )

    linkedin_identity = relationship(
        "LinkedInIdentity",
        back_populates="connected_account",
        uselist=False
    )