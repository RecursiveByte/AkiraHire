from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    JSON,
)

from database.base import Base


class FormQuestion(Base):
    __tablename__ = "form_questions"

    form_id = Column(
        Integer,
        ForeignKey(
            "forms.form_id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )

    questions_json = Column(
        JSON,
        nullable=False,
    )