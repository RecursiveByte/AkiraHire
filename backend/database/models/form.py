from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
)
from sqlalchemy.sql import func

from database.base import Base


class Form(Base):
    __tablename__ = "forms"

    form_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    job_id = Column(
        Integer,
        ForeignKey(
            "jobs.job_id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    title = Column(
        String(255),
        nullable=False,
    )

    status = Column(
        String(20),
        nullable=False,
        default="DRAFT",
    )

    expires_at = Column(
        DateTime(timezone=True),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )