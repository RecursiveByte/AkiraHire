from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database.models.job import Job


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
    def get_by_id(
        db: Session,
        job_id: int,
    ) -> Job | None:

        return (
            db.query(Job)
            .filter(Job.job_id == job_id)
            .first()
        )


    @staticmethod
    def get_all(
        db: Session,
    ) -> list[Job]:

        return (
            db.query(Job)
            .all()
        )


    @staticmethod
    def get_by_created_by(
        db: Session,
        created_by: int,
    ) -> list[Job]:

        return (
            db.query(Job)
            .filter(Job.created_by == created_by)
            .all()
        )