import requests
from uuid import UUID
from fastapi import HTTPException, status

from fastapi import UploadFile
from sqlalchemy.orm import Session

from integration.linkedin.clients import linkedin_client
from integration.linkedin.config.constants import DEFAULT_POST_VISIBILITY
from integration.linkedin.exceptions.linkedin_exceptions import (
    LinkedInDraftNotFoundError,
    LinkedInNotConnectedError,
    LinkedInTokenExpiredError,
)
from integration.linkedin.repositories import linkedin_post_draft_repository
from integration.linkedin.schemas.linkedin_post_response import (
    LinkedInPostResponse,
)
from integration.linkedin.services.auth import linkedin_auth_service
from integration.linkedin.services.llm.post_generator import generate_post_text




def create_draft(
    db: Session,
    user_id: int,
    description: str,
) -> dict:
    post_text = generate_post_text(description)

    draft = linkedin_post_draft_repository.create_draft(
        db=db,
        user_id=user_id,
        post_text=post_text,
    )

    return {
        "draft_id": str(draft.id),
        "post_text": draft.post_text,
    }


def _upload_images(
    access_token: str,
    person_urn: str,
    images: list[bytes],
) -> list[str]:
    asset_urns = []

    for image_bytes in images:
        registration = linkedin_client.register_image_upload(
            access_token,
            person_urn,
        )

        linkedin_client.upload_image_binary(
            registration["upload_url"],
            image_bytes,
        )

        asset_urns.append(registration["asset"])

    return asset_urns


async def confirm_post(
    db: Session,
    user_id: int,
    draft_id: str,
    approved: bool,
    images: list[UploadFile] | None,
) -> LinkedInPostResponse:

    image_bytes = None

    if images:
        image_bytes = [await image.read() for image in images]

    try:
        result = confirm_and_publish(
            db=db,
            user_id=user_id,
            draft_id=draft_id,
            approved=approved,
            images=image_bytes,
        )

        return LinkedInPostResponse(**result)

    except LinkedInDraftNotFoundError as e:
        return LinkedInPostResponse(
            status="draft_not_found",
            post_id=None,
            error=str(e),
        )

    except (
        LinkedInNotConnectedError,
        LinkedInTokenExpiredError,
    ) as e:
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=str(e),
    )


def confirm_and_publish(
    db: Session,
    user_id: int,
    draft_id: str,
    approved: bool,
    images: list[bytes] | None = None,
) -> dict:

    draft = linkedin_post_draft_repository.get_draft(
        db=db,
        draft_id=UUID(draft_id),
        user_id=user_id,
    )

    if draft is None:
        raise LinkedInDraftNotFoundError(draft_id)

    if not approved:
        linkedin_post_draft_repository.delete_draft(
            db=db,
            draft=draft,
        )

        return {
            "status": "discarded",
            "post_id": None,
            "error": None,
        }

    access_token, person_urn = linkedin_auth_service.get_active_connection(
        db,
        user_id,
    )

    try:
        asset_urns = None
        media_category = "NONE"

        if images:
            asset_urns = _upload_images(
                access_token,
                person_urn,
                images,
            )

            media_category = "IMAGE"

        post_id = linkedin_client.create_ugc_post(
            access_token=access_token,
            person_urn=person_urn,
            text=draft.post_text,
            asset_urns=asset_urns,
            media_category=media_category,
            visibility=DEFAULT_POST_VISIBILITY,
        )

        linkedin_post_draft_repository.delete_draft(
            db=db,
            draft=draft,
        )

        return {
            "status": "posted",
            "post_id": post_id,
            "error": None,
        }

    except requests.HTTPError as e:
        return {
            "status": "failed",
            "post_id": None,
            "error": (
                f"LinkedIn API error: "
                f"{e.response.status_code} - {e.response.text}"
            ),
        }