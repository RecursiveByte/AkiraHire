from fastapi import (
    APIRouter,
    Depends,
    Request,
    status,
)

from sqlalchemy.orm import Session

from database.session import get_db

from schemas.job_schema import (
    JobCreate,
    JobResponse,
)

from services.job_service import JobService


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"],
)


@router.post(
    "/create-job",
    response_model=JobResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_job(
    request: Request,
    job_data: JobCreate,
    db: Session = Depends(get_db),
):

    return JobService.create_job(
        request=request,
        db=db,
        job_data=job_data,
    )