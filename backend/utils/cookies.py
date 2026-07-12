from fastapi.responses import Response,JSONResponse
from config.settings import settings

COOKIE_NAME = "refresh_token"
COOKIE_MAX_AGE = 60 * 60 * 24 * 7

def set_refresh_cookie(
    response: Response,
    refresh_token: str,
) -> None:

    response.set_cookie(
        key=COOKIE_NAME,
        value=refresh_token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        max_age=COOKIE_MAX_AGE,
    )


def clear_refresh_cookie(
    response: JSONResponse,
) -> None:

    response.delete_cookie(
        key=COOKIE_NAME,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
    )