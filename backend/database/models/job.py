from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime,
    Enum,
)
from sqlalchemy.sql import func

from database.base import Base

from enums.job_status_enum import JobStatus

class Job(Base):
    __tablename__ = "jobs"

    job_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    recruiter_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        nullable=False,
    )

    role = Column(
        String(150),
        nullable=False,
        index=True,
    )

    job_description = Column(
        Text,
        nullable=False,
    )

    status = Column(
        Enum(JobStatus),
        nullable=False,
        default=JobStatus.DRAFT,
    )

    application_deadline = Column(
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