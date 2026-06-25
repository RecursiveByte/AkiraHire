from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import RedirectResponse
from google_auth_oauthlib.flow import Flow
from sqlalchemy.orm import Session

from agents.google_form_agent.auth.google_auth import (
    GoogleNotConnectedError,
    _save_credentials,
    get_user_id_from_request,
)
from agents.google_form_agent.config.google_oauth import CLIENT_CONFIG
from agents.google_form_agent.config.settings import GOOGLE_REDIRECT_URI
from agents.google_form_agent.constants.google import SCOPES
from agents.google_form_agent.orchestrators.google_autoform import run_autoform_pipeline
from agents.google_form_agent.schemas.google_form_description import AutoFormRequest
from agents.google_form_agent.schemas.google_form_response import GoogleFormResponse
from database.models.connected_account import ConnectedAccount, ProviderType
from database.session import get_db

router = APIRouter()


@router.get("/auth/google/connect")
def connect_google(request: Request):
    user_id = get_user_id_from_request(request)

    flow = Flow.from_client_config(
        CLIENT_CONFIG,
        scopes=SCOPES,
        redirect_uri=GOOGLE_REDIRECT_URI
    )

    auth_url, state = flow.authorization_url(
        access_type="offline",
        prompt="consent",
        state=str(user_id)
    )
    
    request.session["code_verifier"] = flow.code_verifier

    return RedirectResponse(auth_url)


@router.get("/auth/google/connect/callback")
def connect_google_callback(
    request: Request,
    code: str,
    state: str,
    db: Session = Depends(get_db),
):
    user_id = int(state)

    flow = Flow.from_client_config(
        CLIENT_CONFIG,
        scopes=SCOPES,
        redirect_uri=GOOGLE_REDIRECT_URI
    )
    code_verifier = request.session.get("code_verifier")

    if not code_verifier:
        raise HTTPException(
            status_code=400,
            detail="Missing OAuth session. Please connect Google again."
        )

    flow.code_verifier = code_verifier

    flow.fetch_token(code=code)

    creds = flow.credentials

    existing = db.query(ConnectedAccount).filter(
        ConnectedAccount.user_id == user_id,
        ConnectedAccount.provider == ProviderType.GOOGLE,
        ConnectedAccount.agent_name == "google_forms_agent"
    ).first()

    _save_credentials(creds, user_id, "forms_agent", db, existing)

    request.session.pop("code_verifier", None)

    return RedirectResponse("http://localhost:8000/create_google_form")


@router.post("/create_google_form", response_model=GoogleFormResponse)
async def create_google_form(
    request: AutoFormRequest,
    http_request: Request,
    db: Session = Depends(get_db),
):
    user_id = get_user_id_from_request(http_request)

    try:
        return run_autoform_pipeline(user_id, db, request.description)
    except GoogleNotConnectedError:
        return RedirectResponse("/auth/google/connect")