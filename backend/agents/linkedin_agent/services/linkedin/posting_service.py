
# Handles LinkedIn image upload and post creation via LinkedIn REST API

import requests
from agents.linkedin_agent.config import (
    LINKEDIN_ASSETS_URL,
    LINKEDIN_POSTS_URL,
    DEFAULT_POST_VISIBILITY,
)


def register_image_upload(access_token: str, person_urn: str) -> dict:
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    payload = {
        "registerUploadRequest": {
            "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
            "owner": person_urn,
            "serviceRelationships": [
                {
                    "relationshipType": "OWNER",
                    "identifier": "urn:li:userGeneratedContent",
                }
            ],
        }
    }
    response = requests.post(LINKEDIN_ASSETS_URL, headers=headers, json=payload)
    response.raise_for_status()
    value = response.json()["value"]
    upload_url = value["uploadMechanism"][
        "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
    ]["uploadUrl"]
    asset = value["asset"]
    return {"upload_url": upload_url, "asset": asset}


def upload_image_binary(upload_url: str, image_bytes: bytes) -> None:
    response = requests.put(upload_url, data=image_bytes)
    response.raise_for_status()


def upload_images(access_token: str, person_urn: str, images: list[bytes]) -> list[str]:
    asset_urns = []
    for image_bytes in images:
        registration = register_image_upload(access_token, person_urn)
        upload_image_binary(registration["upload_url"], image_bytes)
        asset_urns.append(registration["asset"])
    return asset_urns


def create_post(
    access_token: str,
    person_urn: str,
    text: str,
    asset_urns: list[str] | None = None,
    media_category: str = "NONE",
    visibility: str = DEFAULT_POST_VISIBILITY,
) -> str:
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
    }

    share_content = {
        "shareCommentary": {"text": text},
        "shareMediaCategory": media_category,
    }

    if asset_urns:
        share_content["media"] = [
            {"status": "READY", "media": urn} for urn in asset_urns
        ]

    payload = {
        "author": person_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {"com.linkedin.ugc.ShareContent": share_content},
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": visibility},
    }

    response = requests.post(LINKEDIN_POSTS_URL, headers=headers, json=payload)
    response.raise_for_status()
    return response.headers["x-restli-id"]
