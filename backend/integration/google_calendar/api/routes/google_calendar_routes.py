from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from auth.dependencies.dependencies import (
    get_current_user_from_refresh_token,
)

from auth.dependencies.rate_limit import DefaultRateLimit

from database.session import get_db

from integration.google_calendar.constants.constants import (
    CALENDAR_SCOPES,
    GOOGLE_CALENDAR_INTEGRATION_NAME,
)

from integration.common.config.settings import settings

from integration.common.google_oauth.services.google_oauth_service import GoogleOAuthService

router = APIRouter(
    prefix="/google-calendar",
    tags=["Google Calendar"],
    dependencies=[DefaultRateLimit],
)


@router.get("/auth/google/connect")
def connect_google_calendar(
    request: Request,
    current_user=Depends(get_current_user_from_refresh_token),
    db: Session = Depends(get_db),
):

    auth_url, code_verifier = GoogleOAuthService.create_google_auth_url(
        user_id=current_user["user_id"],
        db=db,
        scopes=CALENDAR_SCOPES,
        redirect_uri=settings.GOOGLE_CALENDAR_CALLBACK_URI,
    )

    request.session["code_verifier"] = code_verifier

    return RedirectResponse(auth_url)


@router.get("/auth/google/connect/callback")
def google_calendar_callback(
    request: Request,
    code: str,
    state: str,
    db: Session = Depends(get_db),
):

    GoogleOAuthService.handle_oauth_callback(
        db=db,
        code=code,
        state=state,
        code_verifier=request.session.get("code_verifier"),
        scopes=CALENDAR_SCOPES,
        redirect_uri=settings.GOOGLE_CALENDAR_CALLBACK_URI,
        integration_name=GOOGLE_CALENDAR_INTEGRATION_NAME,
    )

    request.session.pop("code_verifier", None)

    return RedirectResponse(
        url=f"{settings.FRONTEND_URL}/recruiter/integrations",
        status_code=303,
    )