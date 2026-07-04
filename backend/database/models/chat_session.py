from datetime import datetime

from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from database.base import Base


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    thread_id: Mapped[str] = mapped_column(String, primary_key=True)
    active_agent: Mapped[str | None] = mapped_column(String, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )