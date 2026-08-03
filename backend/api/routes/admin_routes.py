from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database.session import get_db

from schemas.admin_schema import DashboardResponse

from schemas.auth_schema import CurrentUser

from enums.user_role_enum import UserRole

from auth.dependencies.dependencies import require_role

from auth.dependencies.rate_limit import DefaultRateLimit

from services.admin_service import AdminService


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    dependencies=[DefaultRateLimit],
)


@router.get(
    "/dashboard",
    response_model=DashboardResponse,
)
def get_dashboard(
    current_user: CurrentUser = Depends(
        require_role(UserRole.ADMIN),
    ),
    db: Session = Depends(get_db),
):
    return AdminService.get_dashboard(
        db=db,
    )