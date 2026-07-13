from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
)
from sqlalchemy.sql import func
from database.base import Base


class OAuthState(Base):
    __tablename__ = "oauth_states"

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    state = Column(
        String(64),
        unique=True,
        nullable=False,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
