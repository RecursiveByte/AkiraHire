from fastapi import APIRouter, Depends, Query

from sqlalchemy.orm import Session

from typing import Annotated
from database.session import get_db

from schemas.admin_schema import DashboardResponse

from schemas.auth_schema import CurrentUser
from schemas.admin_schema import UserDistributionResponse, UserGrowthItemResponse

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


@router.get(
    "/analytics/user-distribution",
    response_model=UserDistributionResponse,
)
def get_user_distribution(
    current_user: CurrentUser = Depends(
        require_role(UserRole.ADMIN),
    ),
    db: Session = Depends(get_db),
):
    return AdminService.get_user_distribution(
        db=db,
    )


@router.get(
    "/analytics/user-growth",
    response_model=list[UserGrowthItemResponse],
)
def get_user_growth(
    days: Annotated[
        int,
        Query(
            ge=1,
            le=365,
        ),
    ] = 30,
    current_user: CurrentUser = Depends(
        require_role(UserRole.ADMIN),
    ),
    db: Session = Depends(get_db),
):
    return AdminService.get_user_growth(
        db=db,
        days=days,
    )
