from fastapi import APIRouter, Depends, status

from sqlalchemy.orm import Session

from typing import Optional

from database.session import get_db

from schemas.form_schema import (
    CreateFormRequest,
    CreateFormResponse,
    GetFormResponse,
    PublishFormResponse,
    CloseFormResponse,
    DeleteFormResponse,
    GenerateFormSchemaRequest,
    GeneratedFormSchemaResponse,
    GetFormWithJobResponse,
)

from services.form_service import (
    FormService,
)

from services.form_schema_generator_service import FormSchemaService

from auth.dependencies.dependencies import get_current_user, require_role

from enums.user_role_enum import UserRole


from auth.dependencies.rate_limit import DefaultRateLimit

router = APIRouter(
    prefix="/forms",
    tags=["Forms"],
    dependencies=[DefaultRateLimit],
)


@router.post(
    "/generate-form-schema-json",
    response_model=GeneratedFormSchemaResponse,
)
def generate_form_schema(
    payload: GenerateFormSchemaRequest,
    current_user: dict = Depends(require_role(UserRole.ADMIN, UserRole.RECRUITER)),
):

    return FormSchemaService.generate_form_schema(
        description=payload.description,
    )


@router.post(
    "/",
    response_model=CreateFormResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_form(
    payload: CreateFormRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.ADMIN, UserRole.RECRUITER)),
):

    return FormService.create_form(
        payload=payload,
        db=db,
    )


from schemas.auth_schema import CurrentUser


@router.get(
    "/with-job",
    response_model=list[GetFormWithJobResponse],
)
def get_forms_with_job(
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(
        get_current_user,
    ),
):

    return FormService.get_forms_with_job(
        db=db,
        search=search,
    )


@router.get(
    "/{form_id}",
    response_model=GetFormResponse,
)
def get_form_by_id(
    form_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.ADMIN, UserRole.RECRUITER)),
):
    return FormService.get_form_by_id(
        form_id=form_id,
        db=db,
    )


# @router.get(
# "/{form_id}/with-job",
# response_model=GetFormWithJobResponse,
# )
# def get_form_with_job(
# form_id: int,
# db: Session = Depends(get_db),
# current_user: dict = Depends(get_current_user),
# ):
# return FormService.get_form_with_job_by_id(
# form_id=form_id,
# db=db,
# )


@router.get(
    "/job/{job_id}",
    response_model=GetFormResponse,
)
def get_form_by_job_id(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.ADMIN, UserRole.RECRUITER)),
):
    return FormService.get_form_by_job_id(
        job_id=job_id,
        db=db,
    )


@router.get(
    "/recruiter/",
    response_model=list[GetFormResponse],
)
def get_my_forms(
    search: str | None = None,
    current_user: dict = Depends(require_role(UserRole.RECRUITER)),
    db: Session = Depends(get_db),
):
    return FormService.get_forms_by_recruiter_id(
        db=db,
        recruiter_id=current_user.user_id,
        search=search,
    )


@router.patch(
    "/{form_id}/publish",
    response_model=PublishFormResponse,
)
def publish_form(
    form_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.ADMIN, UserRole.RECRUITER)),
):
    return FormService.publish_form(
        form_id=form_id,
        db=db,
    )


@router.patch(
    "/{form_id}/close",
    response_model=CloseFormResponse,
)
def close_form(
    form_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.ADMIN, UserRole.RECRUITER)),
):
    return FormService.close_form(
        form_id=form_id,
        db=db,
    )


@router.delete(
    "/{form_id}",
    response_model=DeleteFormResponse,
)
def delete_form(
    form_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(UserRole.ADMIN, UserRole.RECRUITER)),
):
    return FormService.delete_form(
        form_id=form_id,
        db=db,
    )
