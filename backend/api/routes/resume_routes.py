from fastapi import (
    APIRouter,
    Depends,
)

from auth.dependencies import (
    get_current_user,
)

from schemas.auth_schema import (
    CurrentUser,
)

from schemas.resume_schema import (
    ReadResumeRequest,
    ReadResumeResponse,
)

from core.document.service import (
    ResumeService,
)

router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
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