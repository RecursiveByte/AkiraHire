from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database.models.application_questions import (
    ApplicationQuestion,
)


class ApplicationQuestionRepository:

    @staticmethod
    def create(
        db: Session,
        application_question: ApplicationQuestion,
    ) -> ApplicationQuestion:

        try:

            db.add(application_question)
            db.commit()
            db.refresh(application_question)

            return application_question

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def get_by_application_id(
        db: Session,
        application_id: int,
    ) -> ApplicationQuestion | None:

        return (
            db.query(ApplicationQuestion)
            .filter(
                ApplicationQuestion.application_id == application_id,
            )
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        application_question: ApplicationQuestion,
    ) -> ApplicationQuestion:

        try:

            db.commit()
            db.refresh(application_question)

            return application_question

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def delete(
        db: Session,
        application_question: ApplicationQuestion,
    ) -> None:

        try:

            db.delete(application_question)
            db.commit()

        except SQLAlchemyError:

            db.rollback()
            raise