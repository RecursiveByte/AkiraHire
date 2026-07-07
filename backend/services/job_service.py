from datetime import datetime, timezone

from sqlalchemy.orm import Session

from database.models.job import Job, JobStatus
from database.models.user import UserRole

from exceptions.job_exceptions import (
    JobExpiredError,
    JobNotFoundError,
    InvalidJobStatusTransitionError,
    UnauthorizedRecruiterError,
    JobAlreadyExistsError
)

from repositories.job_repository import JobRepository

from schemas.job_schema import JobCreate, JobUpdate
from schemas.auth_schema import CurrentUser

from utils.logger import get_logger

logger = get_logger(__name__)

from enums.job_status_enum import JOB_STATUS_TRANSITIONS


class JobService:

    @staticmethod
    def create_job(
        current_user: CurrentUser,
        db: Session,
        job_data: JobCreate,
    ) -> Job:

        logger.info("Job creation request received.")

        logger.info(f"Authenticated user. user_id={current_user.user_id}")

        if current_user.role != UserRole.RECRUITER:

            logger.warning(
                f"Unauthorized job creation attempt. user_id={current_user.user_id}"
            )

            raise UnauthorizedRecruiterError()

        if job_data.application_deadline <= datetime.now(timezone.utc):

            logger.warning(f"Invalid expiry date. user_id={current_user.user_id}")

            raise JobExpiredError()

        existing_job = JobRepository.get_by_recruiter_role_description_and_deadline(
            db=db,
            recruiter_id=current_user.user_id,
            role=job_data.role,
            job_description=job_data.job_description,
            application_deadline=job_data.application_deadline,
        )

        if existing_job:

            logger.warning(
                f"Duplicate job creation attempt. "
                f"user_id={current_user.user_id}, role={job_data.role}"
            )

            raise JobAlreadyExistsError()

        job = Job(
            recruiter_id=current_user.user_id,
            role=job_data.role,
            job_description=job_data.job_description,
            application_deadline=job_data.application_deadline,
            status=JobStatus.DRAFT,
        )

        created_job = JobRepository.create(
            db=db,
            job=job,
        )

        logger.info(f"Job created successfully. job_id={created_job.job_id}")

        return created_job

    @staticmethod
    def get_job_by_job_id(
        db: Session,
        job_id: int,
    ) -> Job:

        job = JobRepository.get_by_job_id(
            db=db,
            job_id=job_id,
        )

        if not job:

            logger.warning(f"Job not found. job_id={job_id}")

            raise JobNotFoundError()

        return job

    @staticmethod
    def check_ownership(
        job: Job,
        current_user: CurrentUser,
    ) -> None:

        if (
            job.recruiter_id != current_user.user_id
            and current_user.role != UserRole.ADMIN
        ):

            logger.warning(
                f"Unauthorized job access attempt. "
                f"job_id={job.job_id}, user_id={current_user.user_id}"
            )

            raise UnauthorizedRecruiterError()

    @staticmethod
    def get_jobs_by_recruiter_id(
        db: Session,
        recruiter_id: int,
    ) -> list[Job]:
        return JobRepository.get_jobs_by_recruiter_id(
            db=db,
            recruiter_id=recruiter_id,
        )

    @staticmethod
    def update_job(
        job_id: int,
        current_user: CurrentUser,
        db: Session,
        job_data: JobUpdate,
    ) -> Job:

        logger.info(f"Updating job. job_id={job_id}")

        job = JobService.get_job_by_job_id(db=db, job_id=job_id)

        JobService.check_ownership(job=job, current_user=current_user)

        if job.status != JobStatus.DRAFT:

            logger.warning(f"Only draft jobs can be updated. job_id={job_id}")

            raise InvalidJobStatusTransitionError()

        if job_data.role is not None:
            job.role = job_data.role

        if job_data.job_description is not None:
            job.job_description = job_data.job_description

        if job_data.application_deadline is not None:

            if job_data.application_deadline <= datetime.now(timezone.utc):

                logger.warning(f"Invalid expiry date. job_id={job_id}")

                raise JobExpiredError()

            job.application_deadline = job_data.application_deadline

        updated_job = JobRepository.update(
            db=db,
            job=job,
        )

        logger.info(f"Job updated successfully. job_id={job_id}")

        return updated_job

    @staticmethod
    def delete_job(
        job_id: int,
        current_user: CurrentUser,
        db: Session,
    ) -> None:

        logger.info(f"Deleting job. job_id={job_id}")

        job = JobService.get_job_by_job_id(db=db, job_id=job_id)

        JobService.check_ownership(job=job, current_user=current_user)

        JobRepository.delete(
            db=db,
            job=job,
        )

        logger.info(f"Job deleted successfully. job_id={job_id}")

    @staticmethod
    def change_job_status(
        job_id: int,
        new_status: JobStatus,
        current_user: CurrentUser,
        db: Session,
    ) -> Job:

        logger.info(f"Changing job status. job_id={job_id}, new_status={new_status}")

        job = JobService.get_job_by_job_id(db=db, job_id=job_id)

        JobService.check_ownership(job=job, current_user=current_user)

        if new_status not in JOB_STATUS_TRANSITIONS.get(job.status, set()):

            logger.warning(
                f"Invalid status transition. "
                f"job_id={job_id}, from={job.status}, to={new_status}"
            )

            raise InvalidJobStatusTransitionError()

        job.status = new_status

        updated_job = JobRepository.update(
            db=db,
            job=job,
        )

        logger.info(f"Job status updated. job_id={job_id}, status={new_status}")

        return updated_job

    @staticmethod
    def publish_job(
        job_id: int,
        current_user: CurrentUser,
        db: Session,
    ) -> Job:

        logger.info(f"Publishing job. job_id={job_id}")

        return JobService.change_job_status(
            job_id=job_id,
            new_status=JobStatus.OPEN,
            current_user=current_user,
            db=db,
        )

    @staticmethod
    def close_job(
        job_id: int,
        current_user: CurrentUser,
        db: Session,
    ) -> Job:

        logger.info(f"Closing job. job_id={job_id}")

        return JobService.change_job_status(
            job_id=job_id,
            new_status=JobStatus.CLOSED,
            current_user=current_user,
            db=db,
        )

    @staticmethod
    def cancel_job(
        job_id: int,
        current_user: CurrentUser,
        db: Session,
    ) -> Job:

        logger.info(f"Cancelling job. job_id={job_id}")

        return JobService.change_job_status(
            job_id=job_id,
            new_status=JobStatus.CANCELLED,
            current_user=current_user,
            db=db,
        )