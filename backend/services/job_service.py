from datetime import datetime, timezone

from fastapi import Request
from sqlalchemy.orm import Session

from auth.helpers import get_user_id_from_request

from config.logging import logger

from database.models.job import (
    Job,
    JobStatus,
)
from database.models.user import UserRole

from exceptions.job_exceptions import (
    JobExpiredError,
    UnauthorizedRecruiterError,
)

from repositories.job_repository import JobRepository
from repositories.user_repository import UserRepository

from schemas.job_schema import JobCreate


class JobService:

    @staticmethod
    def create_job(
        request: Request,
        db: Session,
        job_data: JobCreate,
    ) -> Job:

        logger.info("Job creation request received.")

        user_id = get_user_id_from_request(
            request=request,
        )

        logger.info(f"Authenticated user. user_id={user_id}")

        user = UserRepository.get_by_id(
            db=db,
            user_id=user_id,
        )

        if user is None:

            logger.warning(
                f"User not found. user_id={user_id}"
            )

            raise UnauthorizedRecruiterError()

        if user.role != UserRole.RECRUITER:

            logger.warning(
                f"Unauthorized job creation attempt. user_id={user_id}"
            )

            raise UnauthorizedRecruiterError()

        if job_data.expires_at <= datetime.now(timezone.utc):

            logger.warning(
                f"Invalid expiry date. user_id={user_id}"
            )

            raise JobExpiredError()
        job = Job(
    recruiter_id=user_id,
    role=job_data.role,
    job_description=job_data.job_description,
    application_deadline=job_data.expires_at,
    status=JobStatus.DRAFT,
)

        created_job = JobRepository.create(
            db=db,
            job=job,
        )

        logger.info(
            f"Job created successfully. job_id={created_job.job_id}"
        )

        return created_job