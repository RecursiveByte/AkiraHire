from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database.models.form import Form
from database.models.job import Job

from enums.form_status_enum import FormStatus
from enums.job_status_enum import JobStatus


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

        return db.query(Form).filter(Form.form_id == form_id).first()

    @staticmethod
    def get_by_job_id(
        db: Session,
        job_id: int,
    ) -> Form | None:

        return db.query(Form).filter(Form.job_id == job_id).first()

    @staticmethod
    def get_all(db: Session) -> list[Form]:
        return db.query(Form).all()

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

    @staticmethod
    def get_published_forms(
        db: Session,
    ) -> list[Form]:
        return db.query(Form).filter(Form.status == FormStatus.OPEN).all()

    @staticmethod
    def get_published_jobs(
        db: Session,
    ) -> list[Job]:
        return db.query(Job).filter(Job.status == JobStatus.OPEN).all()

    @staticmethod
    def get_forms_with_job(
        db: Session,
        search: str | None = None,
    ):

        query = db.query(Form, Job).join(
            Job,
            Form.job_id == Job.job_id,
        ).filter(Form.status == FormStatus.OPEN)

        if search:

            search = search.strip()

            if search.isdigit():

                query = query.filter(Job.job_id == int(search))

            else:

                query = query.filter(Job.role.ilike(f"{search}%"))

        results = query.all()

        return results


    @staticmethod
    def get_forms_by_recruiter_id(
        db: Session,
        recruiter_id: int,
        search: str | None = None,
    ) -> list[Form]:

        query = (
            db.query(Form)
            .join(Job, Form.job_id == Job.job_id)
            .filter(Job.recruiter_id == recruiter_id)
        )

        if search:

            search = search.strip()

            if search.isdigit():

                query = query.filter(Job.job_id == int(search))

            else:

                query = query.filter(Job.role.ilike(f"{search}%"))

        return query.all()
