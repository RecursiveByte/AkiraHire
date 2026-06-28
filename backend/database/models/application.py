from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
)
from sqlalchemy.sql import func

from database.base import Base


class Application(Base):
    __tablename__ = "applications"

    application_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    form_id = Column(
        Integer,
        ForeignKey(
            "forms.form_id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    candidate_id = Column(
        Integer,
        ForeignKey(
            "candidate_profiles.candidate_id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )


    submitted_at = Column(
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