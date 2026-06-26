from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from database.session import get_db

from agents.google_form_agent.auth.auth_utils import (
    get_user_id_from_request,
)

from agents.google_form_agent.config.settings import (
    FRONTEND_URL,
)

from agents.google_form_agent.schemas.google_form_description import (
    AutoFormRequest,
)

from agents.google_form_agent.schemas.google_form_response import (
    GoogleFormResponse,
)

from agents.google_form_agent.services.google_form_service import (
    create_google_form,
)

from agents.google_form_agent.services.google_oauth_service import (
    create_google_auth_url,
    exchange_code_for_tokens,
    save_google_credentials,
)

router = APIRouter()


@router.get("/auth/google/connect")
def connect_google(
    request: Request,
) -> RedirectResponse:
    """
    Redirect the user to Google's OAuth consent screen.
    """

    user_id = get_user_id_from_request(request)

    auth_url, code_verifier = create_google_auth_url(
        user_id,
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
    """
    Handle Google's OAuth callback.
    """

    code_verifier = request.session.get(
        "code_verifier",
    )

    if code_verifier is None:
        raise HTTPException(
            status_code=400,
            detail="OAuth session expired.",
        )

    credentials = exchange_code_for_tokens(
        code=code,
        code_verifier=code_verifier,
    )

    save_google_credentials(
        db=db,
        user_id=int(state),
        creds=credentials,
    )

    request.session.pop(
        "code_verifier",
        None,
    )

    return RedirectResponse(
        url=f"{FRONTEND_URL}/auth",
        status_code=303,
    )


@router.post(
    "/create_google_form",
    response_model=GoogleFormResponse,
)
def create_google_form_endpoint(
    request: AutoFormRequest,
    http_request: Request,
    db: Session = Depends(get_db),
) -> GoogleFormResponse:
    """
    Generate and create a Google Form.
    """

    user_id = get_user_id_from_request(
        http_request,
    )

    return create_google_form(
        user_id=user_id,
        db=db,
        description=request.description,
    )