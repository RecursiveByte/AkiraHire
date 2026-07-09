from datetime import (
    datetime,
    timedelta,
    timezone,
)
from typing import Any

from jose import jwt

from config.settings import settings
from enums.user_role_enum import UserRole
from exceptions.auth_exceptions import (
    InvalidTokenError,
    TokenExpiredError,
)

def create_access_token(
    user_id: int,
    role: UserRole,
    email: str,
) -> str:
    now = datetime.now(timezone.utc)

    payload = {
        "sub": str(user_id),
        "user_id": user_id,
        "role": role.value,
        "email": email,
        "type": "access",
        "iat": now,
        "exp": now
        + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        ),
    }

    return jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )


def create_refresh_token(
    user_id: int,
    role: UserRole,
) -> str:
    now = datetime.now(timezone.utc)

    payload = {
        "sub": str(user_id),
        "user_id": user_id,
        "role": role.value,
        "type": "refresh",
        "iat": now,
        "exp": now
        + timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS,
        ),
    }

    return jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )


def verify_token(
    token: str,
) -> dict[str, Any]:
    try:
        return jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[
                settings.JWT_ALGORITHM,
            ],
        )

    except jwt.ExpiredSignatureError:
        raise TokenExpiredError()

    except jwt.JWTError:
        raise InvalidTokenError()


def verify_refresh_token(
    token: str,
) -> dict[str, Any]:
    payload = verify_token(token)

    if payload.get("type") != "refresh":
        raise InvalidTokenError()

    return payload