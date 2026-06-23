from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from database.base import Base


class LinkedInIdentity(Base):
    __tablename__ = "linkedin_identities"

    id = Column(Integer, primary_key=True)

    connected_account_id = Column(
        Integer,
        ForeignKey("connected_accounts.id"),
        unique=True,
        nullable=False,
        index=True,
    )

    person_urn = Column(String, nullable=False, index=True)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    connected_account = relationship(
        "ConnectedAccount",
        back_populates="linkedin_identity",
    )