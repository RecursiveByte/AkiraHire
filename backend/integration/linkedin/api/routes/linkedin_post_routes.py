from typing import List, Optional

from fastapi import APIRouter, Depends, File, Form, UploadFile
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from integration.linkedin.schemas.linkedin_post_request import (
    LinkedInPostGenerateRequest,
)
from integration.linkedin.schemas.linkedin_post_response import (
    LinkedInDraftResponse,
    LinkedInPostResponse,
)
from integration.linkedin.services.auth import linkedin_auth_service
from integration.linkedin.services.linkedin.posting_service import (
    LinkedInPostingService,
)

from schemas.auth_schema import UserRole, CurrentUser

from auth.dependencies.dependencies import (
    get_current_user_from_refresh_token,
    require_role,
)
from database.session import get_db


from config.settings import settings
from auth.dependencies.rate_limit import DefaultRateLimit

router = APIRouter(
    prefix="/linkedin",
    tags=["linkedin"],
    dependencies=[DefaultRateLimit],
)


@router.get("/auth/connect")
def login(
    current_user=Depends(get_current_user_from_refresh_token),
) -> RedirectResponse:
    url = linkedin_auth_service.get_authorization_url()
    return RedirectResponse(url)


@router.get("/auth/callback")
def callback(
    code: str,
    currrent_user=Depends(get_current_user_from_refresh_token),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    linkedin_auth_service.handle_oauth_callback(db, currrent_user["user_id"], code)
    return RedirectResponse(
        url=f"{settings.FRONTEND_URL}/recruiter/integrations",
        status_code=302,
    )


@router.post("/generate-post", response_model=LinkedInDraftResponse)
def generate_post(
    request: LinkedInPostGenerateRequest,
    current_user: CurrentUser = Depends(require_role(UserRole.RECRUITER)),
    db: Session = Depends(get_db),
) -> LinkedInDraftResponse:

    draft = LinkedInPostingService.create_draft(
        db=db,
        user_id=current_user.user_id,
        description=request.description,
    )

    return LinkedInDraftResponse(**draft)


@router.get("/drafts", response_model=List[LinkedInDraftResponse])
def list_drafts(
    search: Optional[str] = None,
    current_user: CurrentUser = Depends(require_role(UserRole.RECRUITER)),
    db: Session = Depends(get_db),
) -> List[LinkedInDraftResponse]:

    drafts = LinkedInPostingService.get_drafts(
        db=db,
        user_id=current_user.user_id,
        search=search,
    )

    return [LinkedInDraftResponse(**draft) for draft in drafts]


@router.delete("/drafts/{draft_id}", status_code=204)
def delete_draft(
    draft_id: str,
    current_user: CurrentUser = Depends(require_role(UserRole.RECRUITER)),
    db: Session = Depends(get_db),
) -> None:

    LinkedInPostingService.delete_draft(
        db=db,
        user_id=current_user.user_id,
        draft_id=draft_id,
    )


@router.post("/publish-post", response_model=LinkedInPostResponse)
async def confirm_post(
    draft_id: str = Form(...),
    approved: bool = Form(...),
    images: Optional[List[UploadFile]] = File(None),
    current_user: CurrentUser = Depends(require_role(UserRole.RECRUITER)),
    db: Session = Depends(get_db),
) -> LinkedInPostResponse:

    return await LinkedInPostingService.confirm_post(
        db=db,
        user_id=current_user.user_id,
        draft_id=draft_id,
        approved=approved,
        images=images,
    )
