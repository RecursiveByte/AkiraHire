from typing import List, Optional

from fastapi import APIRouter, File, Form, UploadFile
from fastapi.responses import RedirectResponse

from linkedin_agent.auth.linkedin_auth import (
    exchange_code_for_token,
    get_authorization_url,
    get_person_urn,
)
from linkedin_agent.orchestrators.linkedin_post_orchestrator import (
    confirm_and_publish,
    create_draft,
)
from linkedin_agent.schemas.linkedin_post_request import (
    LinkedInPostGenerateRequest,
)
from linkedin_agent.schemas.linkedin_post_response import (
    LinkedInDraftResponse,
    LinkedInPostResponse
)


router = APIRouter(prefix="/linkedin", tags=["linkedin"])


@router.get("/auth/login")
def login() -> RedirectResponse:
    return RedirectResponse(url=get_authorization_url())


@router.get("/auth/callback")
def callback(code: str) -> dict[str, str]:
    token_data = exchange_code_for_token(code)
    access_token = token_data["access_token"]
    person_urn = get_person_urn(access_token)

    return {
        "access_token": access_token,
        "person_urn": person_urn,
    }


@router.post(
    "/generate-post",
    response_model=LinkedInDraftResponse,
)
def generate_post(
    request: LinkedInPostGenerateRequest,
) -> LinkedInDraftResponse:
    draft = create_draft(request.description)
    return LinkedInDraftResponse(**draft)


@router.post(
    "/confirm-post",
    response_model=LinkedInPostResponse,
)
async def confirm_post(
    draft_id: str = Form(...),
    approved: bool = Form(...),
    access_token: str = Form(...),
    person_urn: str = Form(...),
    images: Optional[List[UploadFile]] = File(None),
) -> LinkedInPostResponse:
    image_bytes_list: List[bytes] = []

    if images:
        for image in images:
            image_bytes_list.append(await image.read())

    result = confirm_and_publish(
        draft_id=draft_id,
        approved=approved,
        access_token=access_token,
        person_urn=person_urn,
        images=image_bytes_list or None,
    )

    return LinkedInPostResponse(**result)