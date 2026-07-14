import requests
from uuid import UUID

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from integration.linkedin.clients import linkedin_client
from integration.linkedin.config.constants import DEFAULT_POST_VISIBILITY
from integration.linkedin.exceptions.linkedin_exceptions import (
    LinkedInDraftNotFoundError,
    LinkedInNotConnectedError,
    LinkedInTokenExpiredError,
)
from integration.linkedin.repositories.linkedin_post_draft_repository import LinkedInPostDraftRepository
from integration.linkedin.schemas.linkedin_post_response import (
    LinkedInPostResponse,
)
from integration.linkedin.services.auth import linkedin_auth_service
from integration.linkedin.services.llm.post_generator import generate_post_text


class LinkedInPostingService:
        
    @staticmethod
    def save_draft(
        db: Session,
        user_id: int,
        post_text: str,
        title: str,
    ) -> dict:
        draft = LinkedInPostDraftRepository.create_draft(
            db=db,
            user_id=user_id,
            post_text=post_text,
            title=title,
        )

        return {
            "draft_id": str(draft.id),
            "title": draft.title,
            "post_text": draft.post_text,
        }
        
    def get_drafts(
        db: Session,
        user_id: int,
        search: str | None = None,
    ) -> list[dict]:
        drafts = LinkedInPostDraftRepository.list_drafts(
            db=db,
            user_id=user_id,
            search=search,
        )

        return [
            {
                "draft_id": str(draft.id),
                "title": draft.title,
                "post_text": draft.post_text,
                "created_at": draft.created_at.isoformat(),
            }
            for draft in drafts
        ]    
        
       
       
        
    @staticmethod
    def delete_draft(
        db: Session,
        user_id: int,
        draft_id: str,
    ) -> None:
        draft = LinkedInPostDraftRepository.get_draft(
            db=db,
            draft_id=UUID(draft_id),
            user_id=user_id,
        )

        if draft is None:
            raise LinkedInDraftNotFoundError(draft_id)

        LinkedInPostDraftRepository.delete_draft(
            db=db,
            draft=draft,
        )    
        
    @staticmethod
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

    @staticmethod
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
            result = LinkedInPostingService.confirm_and_publish(
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

    @staticmethod
    def confirm_and_publish(
        db: Session,
        user_id: int,
        draft_id: str,
        approved: bool,
        images: list[bytes] | None = None,
    ) -> dict:

        draft = LinkedInPostDraftRepository.get_draft(
            db=db,
            draft_id=UUID(draft_id),
            user_id=user_id,
        )

        if draft is None:
            raise LinkedInDraftNotFoundError(draft_id)

        if not approved:
            LinkedInPostDraftRepository.delete_draft(
                db=db,
                draft=draft,
            )

            return {
                "status": "discarded",
                "post_id": None,
                "error": None,
            }

        access_token, person_urn = (
            linkedin_auth_service.get_active_connection(
                db=db,
                user_id=user_id,
            )
        )

        try:
            asset_urns = None
            media_category = "NONE"

            if images:
                asset_urns = LinkedInPostingService._upload_images(
                    access_token=access_token,
                    person_urn=person_urn,
                    images=images,
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

            LinkedInPostDraftRepository.delete_draft(
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