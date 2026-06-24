from sqlalchemy import Column, Integer, String, DateTime, Enum, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum

from database.base import Base


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=True)
    
    role = Column(Enum(UserRole), default=UserRole.USER, nullable=False)

    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    connected_accounts = relationship(
        "ConnectedAccount",
        back_populates="user",
        cascade="all, delete"
    )