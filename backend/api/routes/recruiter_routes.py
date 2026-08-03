from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database.session import get_db

from schemas.auth_schema import CurrentUser
from schemas.recruiter_schema import (
    RecruiterListResponse,
    DeleteRecruiterResponse,
)

from enums.user_role_enum import UserRole

from auth.dependencies.dependencies import require_role

from services.recruiter_service import RecruiterService

from auth.dependencies.rate_limit import DefaultRateLimit


router = APIRouter(
    prefix="/recruiter",
    tags=["Recruiter"],
    dependencies=[DefaultRateLimit],
)


@router.get(
    "/profiles",
    response_model=list[RecruiterListResponse],
)
def get_all_recruiters(
    current_user: CurrentUser = Depends(
        require_role(UserRole.ADMIN),
    ),
    db: Session = Depends(get_db),
):
    return RecruiterService.get_all_recruiters(
        db=db,
    )


@router.delete(
    "/profile/{recruiter_id}",
    response_model=DeleteRecruiterResponse,
)
def delete_recruiter(
    recruiter_id: int,
    current_user: CurrentUser = Depends(
        require_role(UserRole.ADMIN),
    ),
    db: Session = Depends(get_db),
):
    return RecruiterService.delete_recruiter(
        recruiter_id=recruiter_id,
        current_user=current_user,
        db=db,
    )