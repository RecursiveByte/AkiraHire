import requests
from agents.linkedin_agent.config import (
    LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET,
    LINKEDIN_REDIRECT_URI,
    LINKEDIN_AUTH_URL,
    LINKEDIN_TOKEN_URL,
    LINKEDIN_USERINFO_URL,
    LINKEDIN_OAUTH_SCOPES,
)


def get_authorization_url() -> str:
    return (
        f"{LINKEDIN_AUTH_URL}?response_type=code"
        f"&client_id={LINKEDIN_CLIENT_ID}"
        f"&redirect_uri={LINKEDIN_REDIRECT_URI}"
        f"&scope={LINKEDIN_OAUTH_SCOPES}"
    )


def exchange_code_for_token(code: str) -> dict:
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": LINKEDIN_CLIENT_ID,
        "client_secret": LINKEDIN_CLIENT_SECRET,
        "redirect_uri": LINKEDIN_REDIRECT_URI,
    }
    response = requests.post(LINKEDIN_TOKEN_URL, data=payload)
    response.raise_for_status()
    return response.json()


def get_person_urn(access_token: str) -> str:
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(LINKEDIN_USERINFO_URL, headers=headers)
    response.raise_for_status()
    sub = response.json()["sub"]
    return f"urn:li:person:{sub}"