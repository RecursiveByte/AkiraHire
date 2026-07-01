from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    Text,
    Enum,
    DateTime,
)

from sqlalchemy.sql import (
    func,
)

from database.base import Base

from enums.application_evaluation_enum import (
    ApplicationEvaluationStatus,
)


class ApplicationEvaluation(Base):
    __tablename__ = "application_evaluations"

    application_id = Column(
        Integer,
        ForeignKey(
            "applications.application_id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )

    match_score = Column(
        Integer,
        nullable=False,
    )

    reasoning = Column(
        Text,
        nullable=False,
    )

    status = Column(
        Enum(
            ApplicationEvaluationStatus,
        ),
        nullable=False,
    )

    evaluated_at = Column(
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