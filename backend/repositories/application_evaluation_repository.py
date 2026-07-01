from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from database.models.application_evaluation import (
    ApplicationEvaluation,
)

from database.models.application import Application


class ApplicationEvaluationRepository:

    @staticmethod
    def create(
        db: Session,
        application_evaluation: ApplicationEvaluation,
    ) -> ApplicationEvaluation:

        try:

            db.add(
                application_evaluation,
            )

            db.commit()

            db.refresh(
                application_evaluation,
            )

            return application_evaluation

        except SQLAlchemyError:

            db.rollback()

            raise


    @staticmethod
    def get_by_application_id(
        db: Session,
        application_id: int,
    ) -> ApplicationEvaluation | None:

        return (
            db.query(
                ApplicationEvaluation,
            )
            .filter(
                ApplicationEvaluation.application_id
                == application_id,
            )
            .first()
        )


    @staticmethod
    def get_by_form_id(
        db: Session,
        form_id: int,
    ) -> list[ApplicationEvaluation]:

        return (
            db.query(
                ApplicationEvaluation,
            )
            .join(
                ApplicationEvaluation.application,
            )
            .filter(
                Application.form_id == form_id,
            )
            .all()
        )


    @staticmethod
    def update(
        db: Session,
        application_evaluation: ApplicationEvaluation,
    ) -> ApplicationEvaluation:

        try:

            db.commit()

            db.refresh(
                application_evaluation,
            )

            return application_evaluation

        except SQLAlchemyError:

            db.rollback()

            raise


    @staticmethod
    def delete(
        db: Session,
        application_evaluation: ApplicationEvaluation,
    ) -> None:

        try:

            db.delete(
                application_evaluation,
            )

            db.commit()

        except SQLAlchemyError:

            db.rollback()

            raise