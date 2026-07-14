from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database.models.job import Job
from database.models.form import Form

from enums.job_status_enum import JobStatus
from enums.form_status_enum import FormStatus

from datetime import datetime

class JobRepository:

    @staticmethod
    def create(
        db: Session,
        job: Job,
    ) -> Job:

        try:

            db.add(job)
            db.commit()
            db.refresh(job)

            return job

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def get_by_job_id(
        db: Session,
        job_id: int,
    ) -> Job | None:

        return db.query(Job).filter(Job.job_id == job_id).first()

    @staticmethod
    def get_all(
        db: Session,
    ) -> list[Job]:

        return db.query(Job).all()




    @staticmethod
    def get_jobs_by_recruiter_id(
        db: Session,
        recruiter_id: int,
        search: str | None = None,
    ) -> list[Job]:

        query = db.query(Job).filter(
            Job.recruiter_id == recruiter_id,
        )

        if search:

            if search.isdigit():

                query = query.filter(
                    Job.job_id == int(search),
                )

            else:

                query = query.filter(
                    Job.role.ilike(f"{search}%"),
                )

        return query.all()

    @staticmethod
    def get_by_recruiter_role_description_and_deadline(
        db: Session,
        recruiter_id: int,
        role: str,
        job_description: str,
        application_deadline: datetime,
    ) -> Job | None:

        return (
            db.query(Job)
            .filter(
                Job.recruiter_id == recruiter_id,
                Job.role == role,
                Job.job_description == job_description,
                Job.application_deadline == application_deadline,
            )
            .first()
        )

    @staticmethod
    def get_owned_job(db: Session, job_id: int, recruiter_id: int) -> Job | None:
        return (
            db.query(Job)
            .filter(
                Job.job_id == job_id,
                Job.recruiter_id == recruiter_id,
            )
            .first()
        )

    @staticmethod
    def search_jobs(
        db: Session,
        search: str | None,
    ) -> list[Job]:

        query = db.query(Job)

        if search:

            search = search.strip()

            if search.isdigit():

                query = query.filter(Job.job_id == int(search))

            else:

                query = query.filter(Job.role.ilike(f"{search}%"))

        return query.all()
    
    
    @staticmethod
    def update(
        db: Session,
        job: Job,
    ) -> Job:

        try:

            db.commit()
            db.refresh(job)

            return job

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def delete(
        db: Session,
        job: Job,
    ) -> None:

        try:

            db.delete(job)
            db.commit()

        except SQLAlchemyError:

            db.rollback()
            raise
        
    
    @staticmethod
    def close_job_and_form(
        db: Session,
        job: Job,
        form: Form | None,
    ) -> Job:
        """
        Atomically closes a job and its associated form.
        Either both are updated or neither is.
        """
        try:
            job.status = JobStatus.CLOSED

            if form:
                form.status = FormStatus.CLOSED

            db.commit()

            db.refresh(job)

            if form:
                db.refresh(form)

            return job

        except SQLAlchemyError:
            db.rollback()
            raise
