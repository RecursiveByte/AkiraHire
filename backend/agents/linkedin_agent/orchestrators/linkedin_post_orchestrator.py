import uuid
import requests
from agents.linkedin_agent.services.llm.post_generator import generate_post_text
from agents.linkedin_agent.services.linkedin.posting_service import (
    upload_images,
    create_post,
)

_draft_store: dict[str, str] = {}


def create_draft(description: str) -> dict:
    try:
        post_text = generate_post_text(description)
    except Exception as e:
        return {"draft_id": None, "post_text": None, "error": f"LLM generation failed: {str(e)}"}

    draft_id = str(uuid.uuid4())
    _draft_store[draft_id] = post_text
    return {"draft_id": draft_id, "post_text": post_text, "error": None}


def confirm_and_publish(
    draft_id: str,
    approved: bool,
    access_token: str,
    person_urn: str,
    images: list[bytes] | None = None,
) -> dict:
    post_text = _draft_store.get(draft_id)

    if not post_text:
        return {"status": "draft_not_found", "post_id": None, "error": "Draft not found or expired"}

    if not approved:
        _draft_store.pop(draft_id, None)
        return {"status": "discarded", "post_id": None, "error": None}

    try:
        asset_urns = None
        media_category = "NONE"

        if images:
            asset_urns = upload_images(access_token, person_urn, images)
            media_category = "IMAGE"

        post_id = create_post(
            access_token=access_token,
            person_urn=person_urn,
            text=post_text,
            asset_urns=asset_urns,
            media_category=media_category,
        )

        _draft_store.pop(draft_id, None)
        return {"status": "posted", "post_id": post_id, "error": None}

    except requests.HTTPError as e:
        return {
            "status": "failed",
            "post_id": None,
            "error": f"LinkedIn API error: {e.response.status_code} - {e.response.text}",
        }
    except Exception as e:
        return {"status": "failed", "post_id": None, "error": f"Unexpected error: {str(e)}"}