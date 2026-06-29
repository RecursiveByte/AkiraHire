from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    Enum
)
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB
from database.base import Base

from enums.form_status_enum import FormStatus


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
        Enum(FormStatus),
        nullable=False,
        default=FormStatus.DRAFT,
    )
    
    form_schema_json = Column(
    JSONB,
    nullable=False,
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