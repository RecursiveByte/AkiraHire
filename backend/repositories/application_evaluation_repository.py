from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from database.models.application_evaluation import (
    ApplicationEvaluation,
)

from database.models.application import Application
from database.models.form import Form
from database.models.job import Job


from enums.application_evaluation_enum import ApplicationEvaluationStatus

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
                ApplicationEvaluation.application_id == application_id,
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
    def get_all_by_recruiter_id(
        db: Session,
        recruiter_id: int,
        status: ApplicationEvaluationStatus | None,
    ) -> list[ApplicationEvaluation]:

        query = (
            db.query(ApplicationEvaluation)
            .join(
                Application,
                Application.application_id == ApplicationEvaluation.application_id,
            )
            .join(
                Form,
                Form.form_id == Application.form_id,
            )
            .join(
                Job,
                Job.job_id == Form.job_id,
            )
            .filter(
                Job.recruiter_id == recruiter_id,
            )
        )

        if status:
            query = query.filter(
                ApplicationEvaluation.status == status,
            )

        return query.all()

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
    def get_all(
        db: Session,
    ) -> list[ApplicationEvaluation]:
        return db.query(
            ApplicationEvaluation,
        ).all()

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
