from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from database.session import get_db

from auth.dependencies import get_current_user_from_refresh_token
from schemas.auth_schema import CurrentUser

from integration.google_form.config.settings import settings

from integration.google_form.schemas.google_form_description import (
    AutoFormRequest,
)

from integration.google_form.schemas.google_form_response import (
    GoogleFormResponse,
)

from integration.google_form.services.google_form_service import GoogleFormService

from integration.google_form.services.google_form_service import GoogleOAuthService



router = APIRouter(
    prefix="/google-forms",
    tags=["GoogleForms"],
)


@router.get("/auth/google/connect")
def connect_google(
    request: Request,
    current_user=Depends(get_current_user_from_refresh_token),
    db: Session = Depends(get_db),
) -> RedirectResponse:

    auth_url, code_verifier = GoogleOAuthService.create_google_auth_url(
        db=db,
        user_id=current_user["user_id"],
    )

    request.session["code_verifier"] = code_verifier

    return RedirectResponse(url=auth_url)

@router.get("/auth/google/connect/callback")
def google_oauth_callback(
    request: Request,
    code: str,
    state: str,
    db: Session = Depends(get_db),
) -> RedirectResponse:

    GoogleOAuthService.handle_oauth_callback(
        db=db,
        code=code,
        state=state,
        code_verifier=request.session.get("code_verifier"),
    )

    request.session.pop("code_verifier", None)

    return RedirectResponse(
        url=f"{settings.FRONTEND_URL}/recruiter/integrations",
        status_code=303,
    )


@router.post(
    "/create_google_form",
    response_model=GoogleFormResponse,
)
def create_google_form_endpoint(
    payload: AutoFormRequest,
    current_user= Depends(get_current_user_from_refresh_token),
    db: Session = Depends(get_db),
) -> GoogleFormResponse:

    return GoogleFormService.create_google_form(
        user_id=current_user["user_id"],
        db=db,
        description=payload.description,
    )