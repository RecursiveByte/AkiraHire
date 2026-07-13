from fastapi import HTTPException, Request
from auth.jwt import verify_token
from schemas.auth_schema import CurrentUser


def get_current_user(
    request: Request,
) -> CurrentUser:

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
        
    

    return CurrentUser(
        user_id=payload["user_id"],
        role=payload["role"],
        email=payload["email"],
        type=payload["type"],
    )


def require_role(*required_roles: str):

    def role_checker(
        request: Request,
    ) -> CurrentUser:

        current_user = get_current_user(
            request=request,
        )
        
        if current_user.role not in required_roles:
            raise HTTPException(
                status_code=403,
                detail="You don't have permission to access this.",
            )

        return current_user

    return role_checker



def get_current_user_from_refresh_token(
    request: Request,
) -> dict:

    refresh_token = request.cookies.get("refresh_token")

    if refresh_token is None:
        raise HTTPException(
            status_code=401,
            detail="Not Authorized",
        )

    payload = verify_token(
        refresh_token,
    )

    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=401,
            detail="Not Authorized",
        )

    return {
    "user_id": payload["user_id"],
    "role": payload["role"],
    "type": payload["type"],
}