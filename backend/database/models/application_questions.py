from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    JSON,
)

from database.base import Base


class ApplicationQuestion(Base):
    __tablename__ = "application_questions"

    application_id = Column(
        Integer,
        ForeignKey(
            "applications.application_id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )

    answers_json = Column(
        JSON,
        nullable=False,
    )