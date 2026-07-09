from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database.models.job import Job
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
    ) -> list[Job]:

        return db.query(Job).filter(Job.recruiter_id == recruiter_id).all()

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
