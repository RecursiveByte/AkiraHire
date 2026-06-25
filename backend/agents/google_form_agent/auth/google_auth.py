import os
from datetime import datetime, timezone

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from sqlalchemy.orm import Session
from fastapi import HTTPException, Request as FastAPIRequest

from database.models.connected_account import ConnectedAccount, ProviderType
from auth.jwt import verify_token


SCOPES = [
    "https://www.googleapis.com/auth/forms.body",
    "https://www.googleapis.com/auth/forms",
    "https://www.googleapis.com/auth/spreadsheets",
]

CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")


class GoogleNotConnectedError(Exception):
    """Raised when the user has no valid Google credentials and must
    be redirected to /auth/google/connect to (re)authorize."""
    pass


def get_user_id_from_request(request: FastAPIRequest) -> int:
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="No refresh token found")

    payload = verify_token(refresh_token)
    return payload["user_id"]


def get_credentials(user_id: int, agent_name: str, db: Session) -> Credentials:
    if not CLIENT_ID or not CLIENT_SECRET:
        raise EnvironmentError(
            "GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in your .env file."
        )

    connected = (
        db.query(ConnectedAccount)
        .filter(
            ConnectedAccount.user_id == user_id,
            ConnectedAccount.provider == ProviderType.GOOGLE,
            ConnectedAccount.agent_name == agent_name,
        )
        .first()
    )

    creds = None

    if connected:
        token_data = {
            "token": connected.access_token,
            "refresh_token": connected.refresh_token,
            "token_uri": "https://oauth2.googleapis.com/token",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "scopes": connected.scopes.split(",") if connected.scopes else SCOPES,
        }
        creds = Credentials.from_authorized_user_info(token_data, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except Exception as e:
                raise GoogleNotConnectedError(
                    f"Failed to refresh Google token for user {user_id} / agent {agent_name}: {e}"
                )
            _save_credentials(creds, user_id, agent_name, db, connected)
        else:
            raise GoogleNotConnectedError(
                "Google account not connected. Please connect your Google account first."
            )

    return creds


def _save_credentials(
    creds: Credentials,
    user_id: int,
    agent_name: str,
    db: Session,
    existing: ConnectedAccount | None,
):
    expires_at = None

    if creds.expiry:
        expires_at = creds.expiry.replace(tzinfo=timezone.utc)

    if existing:
        existing.access_token = creds.token
        if creds.refresh_token:
            existing.refresh_token = creds.refresh_token
        existing.scopes = ",".join(creds.scopes or [])
        existing.expires_at = expires_at
        existing.updated_at = datetime.now(timezone.utc)
    else:
        new_account = ConnectedAccount(
            user_id=user_id,
            provider=ProviderType.GOOGLE,
            agent_name=agent_name,
            access_token=creds.token,
            refresh_token=creds.refresh_token,
            scopes=",".join(creds.scopes or []),
            expires_at=expires_at,
        )
        db.add(new_account)

    db.commit()