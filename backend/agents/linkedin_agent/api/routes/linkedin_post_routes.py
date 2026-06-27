from typing import List, Optional

from fastapi import APIRouter, Depends, File, Form, UploadFile
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from agents.linkedin_agent.schemas.linkedin_post_request import (
    LinkedInPostGenerateRequest,
)
from agents.linkedin_agent.schemas.linkedin_post_response import (
    LinkedInConnectionStatusResponse,
    LinkedInDraftResponse,
    LinkedInPostResponse,
)
from agents.linkedin_agent.services.auth import linkedin_auth_service
from agents.linkedin_agent.services.linkedin import posting_service

from auth.auth_utils import get_user_id_from_request
from database.session import get_db

router = APIRouter(prefix="/linkedin", tags=["linkedin"])


@router.get("/status", response_model=LinkedInConnectionStatusResponse)
def connection_status(
    user_id: int = Depends(get_user_id_from_request),
    db: Session = Depends(get_db),
) -> LinkedInConnectionStatusResponse:
    connected = linkedin_auth_service.is_connected(db, user_id)
    return LinkedInConnectionStatusResponse(connected=connected)


@router.get("/auth/login")
def login(user_id: int = Depends(get_user_id_from_request)) -> RedirectResponse:
    url = linkedin_auth_service.get_authorization_url()
    print(url)
    return RedirectResponse(url)

@router.get("/auth/callback")
def callback(
    code: str,
    user_id: int = Depends(get_user_id_from_request),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    linkedin_auth_service.handle_oauth_callback(db, user_id, code)
    return {"status": "connected"}


@router.post("/generate-post", response_model=LinkedInDraftResponse)
def generate_post(
    request: LinkedInPostGenerateRequest,
    user_id: int = Depends(get_user_id_from_request),
    db: Session = Depends(get_db),
) -> LinkedInDraftResponse:

    draft = posting_service.create_draft(
        db=db,
        user_id=user_id,
        description=request.description,
    )

    return LinkedInDraftResponse(**draft)


@router.post("/confirm-post", response_model=LinkedInPostResponse)
async def confirm_post(
    draft_id: str = Form(...),
    approved: bool = Form(...),
    images: Optional[List[UploadFile]] = File(None),
    user_id: int = Depends(get_user_id_from_request),
    db: Session = Depends(get_db),
) -> LinkedInPostResponse:

    return await posting_service.confirm_post(
        db=db,
        user_id=user_id,
        draft_id=draft_id,
        approved=approved,
        images=images,
    )