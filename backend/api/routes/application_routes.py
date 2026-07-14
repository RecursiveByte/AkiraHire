from fastapi import APIRouter, Depends, status

from sqlalchemy.orm import Session

from database.session import (
    get_db,
)

from auth.dependencies.dependencies import require_role, get_current_user

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

from schemas.auth_schema import CurrentUser

from auth.dependencies.rate_limit import DefaultRateLimit

router = APIRouter(
    prefix="/applications",
    tags=["Applications"],
    dependencies=[DefaultRateLimit],
)


@router.get("/applied-form-ids")
def get_applied_form_ids(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.CANDIDATE)),
):
    return ApplicationService.get_applied_form_ids(
        user_id=current_user.user_id,
        db=db,
    )


@router.get(
    "/candidate/",
)
def search_candidate_applications(
    search: str | None = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(
        require_role(UserRole.CANDIDATE),
    ),
):

    return ApplicationService.search_candidate_applications(
        user_id=current_user.user_id,
        db=db,
        search=search,
    )


# @router.get(
# "/candidate/view",
# )
# def get_candidate_applications(
# db: Session = Depends(get_db),
# current_user: dict = Depends(require_role(UserRole.CANDIDATE)),
# ):
# return ApplicationService.get_candidate_applications(
# user_id=current_user.user_id,
# db=db,
# )


@router.get("/recruiter/view")
def get_recruiter_applications(
    search: str | None = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.RECRUITER)),
):
    return ApplicationService.get_recruiter_applications(
        recruiter_id=current_user.user_id,
        db=db,
        search=search,
    )


@router.post(
    "/", response_model=CreateApplicationResponse, status_code=status.HTTP_201_CREATED
)
def create_application(
    payload: CreateApplicationRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.CANDIDATE)),
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
    current_user: dict = Depends(require_role(UserRole.RECRUITER)),
):

    return ApplicationService.get_application_by_id(
        application_id=application_id,
        db=db,
    )


@router.get(
    "/recruiter/{recruiter_id}",
)
def get_applications_by_recruiter_id(
    recruiter_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.RECRUITER)),
):
    return ApplicationService.get_application_by_recruiter_id(
        recruiter_id=recruiter_id,
        db=db,
    )


@router.get(
    "/{application_id}/view",
)
def get_application_with_form(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.RECRUITER)),
):
    return ApplicationService.get_application_with_form(
        application_id=application_id,
        db=db,
    )


@router.get("/recruiter/{recruiter_id}/view")
def get_all_applications_with_form_by_recruiter_id(
    recruiter_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.RECRUITER)),
):
    return ApplicationService.get_recruiter_applications(
        recruiter_id=recruiter_id,
        db=db,
    )


@router.get("/candidate/{candidate_id}/view")
def get_all_applications_with_form_by_recruiter_id(
    recruiter_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.CANDIDATE)),
):
    return ApplicationService.get_recruiter_applications(
        recruiter_id=recruiter_id,
        db=db,
    )


@router.get(
    "/{application_id}",
    response_model=GetApplicationResponse,
)
def get_application_by_id(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.RECRUITER)),
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
    current_user: dict = Depends(require_role(UserRole.CANDIDATE, UserRole.ADMIN)),
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
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    return ApplicationService.delete_application(
        application_id=application_id,
        db=db,
    )
