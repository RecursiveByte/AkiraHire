from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
from database.session import get_db

from auth.dependencies import get_current_user
from schemas.auth_schema import CurrentUser

from integration.google_form.config.settings import settings

from integration.google_form.schemas.google_form_description import (
    AutoFormRequest,
)

from integration.google_form.schemas.google_form_response import (
    GoogleFormResponse,
)

from integration.google_form.services.google_form_service import (
    create_google_form,
)

from integration.google_form.services import google_oauth_service


router = APIRouter(
    prefix="/google-forms",
    tags=["GoogleForms"],
)


@router.get("/test-ui")
def serve_test_ui():
    return FileResponse("static/google_form_agent.html")

@router.get("/auth/google/connect")
def connect_google(
    request: Request,
    current_user: CurrentUser = Depends(get_current_user),
) -> RedirectResponse:

    auth_url, code_verifier = google_oauth_service.create_google_auth_url(
        user_id=current_user.user_id,
    )

    request.session["code_verifier"] = code_verifier

    return RedirectResponse(
        url=auth_url,
    )


@router.get("/auth/google/connect/callback")
def google_oauth_callback(
    request: Request,
    code: str,
    state: str,
    db: Session = Depends(get_db),
) -> RedirectResponse:

    google_oauth_service.handle_oauth_callback(
        db=db,
        code=code,
        state=state,
        code_verifier=request.session.get("code_verifier"),
    )

    request.session.pop("code_verifier", None)

    return RedirectResponse(
        url=f"{settings.FRONTEND_URL}/auth",
        status_code=303,
    )


@router.post(
    "/create_google_form",
    response_model=GoogleFormResponse,
)
def create_google_form_endpoint(
    payload: AutoFormRequest,
    current_user: CurrentUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> GoogleFormResponse:

    return create_google_form(
        user_id=current_user.user_id,
        db=db,
        description=payload.description,
    )