from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from auth.google_oauth import oauth
from auth.jwt import (
    create_access_token,
    create_refresh_token,
)

from database.models.user import User

from passlib.context import CryptContext


async def google_login_service(
    request: Request,
):
    redirect_uri = (
        "http://localhost:8000/auth/google/callback"
    )

    return await oauth.google.authorize_redirect(
        request,
        redirect_uri,
    )


async def google_callback_service(
    request: Request,
    db: Session,
):
    try:

        token = await oauth.google.authorize_access_token(
            request
        )

        user_info = token["userinfo"]

        email = user_info["email"]
        name = user_info["name"]

        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if not user:

            user = User(
                name=name,
                email=email,
            )

            db.add(user)
            db.commit()
            db.refresh(user)

        access_token = create_access_token(
            user.id,user.role
        )

        refresh_token = create_refresh_token(
            user.id
        )

        response = JSONResponse(
            {
                "access_token": access_token,
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                },
            }
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=False,  
            samesite="lax",
            max_age=60 * 60 * 24 * 30,
        )

        return response

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):
    return pwd_context.hash(password)


def register_user(payload, db: Session):

    try:

        existing_user = db.query(User).filter(
            User.email == payload.email
        ).first()

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="User already exists"
            )

        user = User(
            name=payload.name,
            email=payload.email,
            role="user",
            password_hash=hash_password(payload.password)
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        access_token = create_access_token(user.id,user.role)
        refresh_token = create_refresh_token(user.id)

        response = JSONResponse(
            {
                "access_token": access_token,
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }
            }
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=60 * 60 * 24 * 30,
        )

        return response

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

def logout_user(request: Request):
    try:
        refresh_token = request.cookies.get("refresh_token")

        if not refresh_token:
            raise HTTPException(
                status_code=400,
                detail="No active session found"
            )

        response = JSONResponse(
            {"message": "Logged out successfully"}
        )

        response.delete_cookie(
            key="refresh_token",
            httponly=True,
            secure=False,  
            samesite="lax",
        )

        return response

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )