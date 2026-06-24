from jose import jwt
from datetime import datetime, timedelta, timezone
import os

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")

ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 30


def create_access_token(user_id: int):
    payload = {
        "user_id": user_id,
        "type": "access",
        "exp": datetime.now(timezone.utc)
        + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(user_id: int):
    payload = {
        "user_id": user_id,
        "type": "refresh",
        "exp": datetime.now(timezone.utc)
        + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)