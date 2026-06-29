from fastapi import HTTPException, Request
from auth.jwt import verify_token


def get_current_user(
    request: Request,
) -> dict:

    auth_header = request.headers.get("Authorization")

    if (
        auth_header is None
        or not auth_header.startswith("Bearer ")
    ):
        raise HTTPException(
            status_code=401,
            detail="Not Authorized",
        )

    access_token = auth_header.split(" ")[1]

    payload = verify_token(
        access_token,
    )

    if payload.get("type") != "access":
        raise HTTPException(
            status_code=401,
            detail="Not Authorized",
        )

    return payload


def require_role(*required_roles: str):

    def role_checker(
        request: Request,
    ) -> dict:

        payload = get_current_user(
            request=request,
        )

        if payload.get("role") not in required_roles:
            raise HTTPException(
                status_code=403,
                detail="You don't have permission to access this.",
            )

        return payload

    return role_checker