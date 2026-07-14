from fastapi import APIRouter, Depends, UploadFile, File

from auth.dependencies.dependencies import get_current_user, require_role

from schemas.auth_schema import (
    CurrentUser,
)

from enums.user_role_enum import UserRole

from schemas.resume_schema import (
    ReadResumeRequest,
    ReadResumeResponse,
)

from core.document.service import (
    ResumeService,
)

from auth.dependencies.rate_limit import DefaultRateLimit

router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
    dependencies=[DefaultRateLimit],
)


@router.post(
    "/read",
    response_model=ReadResumeResponse,
)
def read_resume(
    payload: ReadResumeRequest,
    current_user: CurrentUser = Depends(
        get_current_user,
    ),
):

    content = ResumeService.read_resume(
        resume_url=str(payload.resume_url),
    )

    return ReadResumeResponse(
        content=content,
    )


@router.post("/upload")
def upload_resume(
    resume: UploadFile = File(...),
    current_user: CurrentUser = Depends(require_role(UserRole.CANDIDATE)),
):
    return ResumeService.upload_resume(
        file=resume,
    )
