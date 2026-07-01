from fastapi import (
    APIRouter,
    Depends,
    status
)

from sqlalchemy.orm import Session

from database.session import (
    get_db,
)

from auth.dependencies import require_role,get_current_user

from enums.user_role_enum import UserRole

from schemas.application_schema import (
    CreateApplicationRequest,
    CreateApplicationResponse,
    GetApplicationResponse,
    UpdateApplicationRequest,
    UpdateApplicationResponse,
    DeleteApplicationResponse,
)

from services.application_service import (
    ApplicationService,
)

router = APIRouter(
    prefix="/applications",
    tags=["Applications"],
)


@router.post(
    "/",
    response_model=CreateApplicationResponse,
    status_code=status.HTTP_201_CREATED
)

def create_application(
    payload: CreateApplicationRequest,
    db: Session = Depends(get_db),
        current_user: dict = Depends(
    require_role(UserRole.CANDIDATE)
),
):

    return ApplicationService.create_application(
        payload=payload,
        current_user=current_user,
        db=db,
    )


@router.get(
    "/{application_id}",
    response_model=GetApplicationResponse,
)

def get_application_by_id(
    application_id: int,
    db: Session = Depends(get_db),
            current_user: dict = Depends(
    get_current_user
),
):

    return ApplicationService.get_application_by_id(
        application_id=application_id,
        db=db,
    )


@router.patch(
    "/{application_id}",
    response_model=UpdateApplicationResponse,
)

def update_application(
    application_id: int,
    payload: UpdateApplicationRequest,
    db: Session = Depends(get_db),
            current_user: dict = Depends(
    require_role(UserRole.CANDIDATE,UserRole.ADMIN)
),
):

    return ApplicationService.update_application(
        application_id=application_id,
        payload=payload,
        db=db,
    )


@router.delete(
    "/{application_id}",
    response_model=DeleteApplicationResponse,
)

def delete_application(
    application_id: int,
        current_user: dict = Depends(
    require_role(UserRole.CANDIDATE,UserRole.ADMIN)
),
    db: Session = Depends(get_db),
):

    return ApplicationService.delete_application(
        application_id=application_id,
        db=db,
    )