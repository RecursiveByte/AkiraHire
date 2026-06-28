
from fastapi import HTTPException, Request

from auth.jwt import verify_token


def get_user_id_from_request(
    request: Request,
) -> int:

    refresh_token = request.cookies.get(
        "refresh_token",
    )

    if refresh_token is None:

        raise HTTPException(
            status_code=401,
            detail="No refresh token found.",
        )

    payload = verify_token(
        refresh_token,
    )

    return payload["user_id"]