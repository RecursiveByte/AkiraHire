from sqlalchemy import Column, Integer, String, DateTime, Enum, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from database.base import Base

from enums.user_role_enum import UserRole


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=True)

    role = Column(Enum(UserRole), default=UserRole.CANDIDATE, nullable=False)

    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    connected_accounts = relationship(
        "ConnectedAccount", back_populates="user", cascade="all, delete"
    )

    chat_threads = relationship(
        "ChatThread",
        back_populates="user",
        cascade="all, delete-orphan",
    )
