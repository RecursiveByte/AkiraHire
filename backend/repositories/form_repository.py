from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database.models.form import Form
from database.models.job import Job

class FormRepository:

    @staticmethod
    def create(
        db: Session,
        form: Form,
    ) -> Form:

        try:

            db.add(form)
            db.commit()
            db.refresh(form)

            return form

        except SQLAlchemyError:

            db.rollback()
            raise


    @staticmethod
    def get_by_id(
        db: Session,
        form_id: int,
    ) -> Form | None:

        return (
            db.query(Form)
            .filter(Form.form_id == form_id)
            .first()
        )


    @staticmethod
    def get_by_job_id(
        db: Session,
        job_id: int,
    ) -> Form | None:

        return (
            db.query(Form)
            .filter(Form.job_id == job_id)
            .first()
        )
        
    @staticmethod
    def get_forms_by_recruiter_id(
        db: Session,
        recruiter_id: int,
    ) -> list[Form]:
        return (
            db.query(Form)
            .join(Job, Form.job_id == Job.job_id)
            .filter(Job.recruiter_id == recruiter_id)
            .all()
        )

    @staticmethod
    def update(
        db: Session,
        form: Form,
    ) -> Form:

        try:

            db.commit()
            db.refresh(form)

            return form

        except SQLAlchemyError:

            db.rollback()
            raise


    @staticmethod
    def delete(
        db: Session,
        form: Form,
    ) -> None:

        try:

            db.delete(form)
            db.commit()

        except SQLAlchemyError:

            db.rollback()
            raise