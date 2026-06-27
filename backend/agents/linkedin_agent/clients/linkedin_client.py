import requests

from agents.linkedin_agent.config.settings import settings
from agents.linkedin_agent.config.constants import (
    LINKEDIN_AUTH_URL,
    LINKEDIN_TOKEN_URL,
    LINKEDIN_USERINFO_URL,
    LINKEDIN_OAUTH_SCOPES,
    LINKEDIN_ASSETS_URL,
    LINKEDIN_POSTS_URL,
)


def build_authorization_url() -> str:
    return (
        f"{LINKEDIN_AUTH_URL}?response_type=code"
        f"&client_id={settings.LINKEDIN_CLIENT_ID}"
        f"&redirect_uri={settings.LINKEDIN_REDIRECT_URI}"
        f"&scope={LINKEDIN_OAUTH_SCOPES}"
    )


def exchange_code_for_token(code: str) -> dict:
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": settings.LINKEDIN_CLIENT_ID,
        "client_secret": settings.LINKEDIN_CLIENT_SECRET,
        "redirect_uri": settings.LINKEDIN_REDIRECT_URI,
    }
    response = requests.post(LINKEDIN_TOKEN_URL, data=payload)
    response.raise_for_status()
    return response.json()


def fetch_userinfo(access_token: str) -> dict:
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(LINKEDIN_USERINFO_URL, headers=headers)
    response.raise_for_status()
    return response.json()


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

    response = requests.post(
        LINKEDIN_ASSETS_URL,
        headers=headers,
        json=payload,
    )
    response.raise_for_status()

    value = response.json()["value"]
    upload_url = value["uploadMechanism"][
        "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
    ]["uploadUrl"]
    asset = value["asset"]

    return {
        "upload_url": upload_url,
        "asset": asset,
    }


def upload_image_binary(upload_url: str, image_bytes: bytes) -> None:
    response = requests.put(upload_url, data=image_bytes)
    response.raise_for_status()


def create_ugc_post(
    access_token: str,
    person_urn: str,
    text: str,
    asset_urns: list[str] | None,
    media_category: str,
    visibility: str,
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
            {
                "status": "READY",
                "media": urn,
            }
            for urn in asset_urns
        ]

    payload = {
        "author": person_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": share_content,
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": visibility,
        },
    }

    response = requests.post(
        LINKEDIN_POSTS_URL,
        headers=headers,
        json=payload,
    )
    response.raise_for_status()

    return response.headers["x-restli-id"]