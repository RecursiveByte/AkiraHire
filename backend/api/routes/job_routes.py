from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from database.session import get_db
from typing import Optional

from schemas.job_schema import (
    JobCreate,
    JobUpdate,
    JobResponse,
    GenerateJobDescriptionRequest,
    GenerateJobDescriptionResponse,
    DeleteJobResponse,
)

from schemas.auth_schema import CurrentUser

from enums.user_role_enum import UserRole

from auth.dependencies.dependencies import require_role, get_current_user

from services.job_service import JobService
from services.job_description_service import JobDescriptionService

from auth.dependencies.rate_limit import DefaultRateLimit

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"],
    dependencies=[DefaultRateLimit],
)


@router.get(
    "/search",
    response_model=list[JobResponse],
)
def search_jobs(
    search: str | None = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    return JobService.search_jobs(
        db=db,
        search=search,
    )


@router.get(
    "/recruiter",
    response_model=list[JobResponse],
)
def get_jobs_by_recruiter_id(
    search: str | None = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(
        require_role(UserRole.RECRUITER),
    ),
):
    return JobService.get_jobs_by_recruiter_id(
        db=db,
        recruiter_id=current_user.user_id,
        search=search,
    )


@router.post(
    "/generate-description",
    response_model=GenerateJobDescriptionResponse,
)
def generate_job_description(
    payload: GenerateJobDescriptionRequest,
    current_user: CurrentUser = Depends(
        require_role(UserRole.RECRUITER),
    ),
):
    return JobDescriptionService.generate_job_description(
        description=payload.description,
    )


@router.post(
    "/",
    response_model=JobResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_job(
    job_data: JobCreate,
    current_user: CurrentUser = Depends(
        require_role(UserRole.RECRUITER),
    ),
    db: Session = Depends(get_db),
):
    return JobService.create_job(
        current_user=current_user,
        db=db,
        job_data=job_data,
    )


@router.get(
    "/{job_id}",
    response_model=JobResponse,
)
def get_job_by_job_id(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    return JobService.get_job_by_job_id(
        db=db,
        job_id=job_id,
    )


@router.patch(
    "/{job_id}",
    response_model=JobResponse,
)
def update_job(
    job_id: int,
    job_data: JobUpdate,
    current_user: CurrentUser = Depends(
        require_role(UserRole.RECRUITER, UserRole.ADMIN),
    ),
    db: Session = Depends(get_db),
):
    return JobService.update_job(
        job_id=job_id,
        current_user=current_user,
        db=db,
        job_data=job_data,
    )


@router.delete(
    "/{job_id}",
    response_model=DeleteJobResponse,
)
def delete_job(
    job_id: int,
    current_user: CurrentUser = Depends(
        require_role(UserRole.RECRUITER, UserRole.ADMIN),
    ),
    db: Session = Depends(get_db),
):
    JobService.delete_job(
        job_id=job_id,
        current_user=current_user,
        db=db,
    )

    return {"message": "Job deleted successfully."}


@router.patch(
    "/{job_id}/publish",
    response_model=JobResponse,
)
def publish_job(
    job_id: int,
    current_user: CurrentUser = Depends(
        require_role(UserRole.RECRUITER, UserRole.ADMIN),
    ),
    db: Session = Depends(get_db),
):
    return JobService.publish_job(
        job_id=job_id,
        current_user=current_user,
        db=db,
    )


@router.patch(
    "/{job_id}/close",
    response_model=JobResponse,
)
def close_job(
    job_id: int,
    current_user: CurrentUser = Depends(
        require_role(UserRole.RECRUITER, UserRole.ADMIN),
    ),
    db: Session = Depends(get_db),
):
    return JobService.close_job(
        job_id=job_id,
        current_user=current_user,
        db=db,
    )
