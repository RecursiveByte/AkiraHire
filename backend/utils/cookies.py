from fastapi.responses import JSONResponse


COOKIE_NAME = "refresh_token"
COOKIE_MAX_AGE = 60 * 60 * 24 * 30


def set_refresh_cookie(
    response: JSONResponse,
    refresh_token: str,
) -> None:

    response.set_cookie(
        key=COOKIE_NAME,
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=COOKIE_MAX_AGE,
    )


def clear_refresh_cookie(
    response: JSONResponse,
) -> None:

    response.delete_cookie(
        key=COOKIE_NAME,
        httponly=True,
        secure=False,
        samesite="lax",
    )