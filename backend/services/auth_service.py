from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse,RedirectResponse
from sqlalchemy.orm import Session

from auth.google_oauth import oauth
from auth.jwt import (
    create_access_token,
    create_refresh_token,
    verify_refresh_token,
)

from utils.cookies import set_refresh_cookie, clear_refresh_cookie

from utils.password import verify_password, hash_password

from utils.otp import generate_otp, hash_otp, verify_otp

from datetime import datetime, timezone, timedelta

from config.settings import settings

from database.models.user import (
    User,
    UserRole,
)



from exceptions.auth_exceptions import (
    UserAlreadyExistsError,
    GoogleAuthenticationError,
    InvalidCredentialsError,
    InvalidTokenError,
    UserNotFoundError,
    InvalidOTPError
)

from repositories.user_repository import UserRepository

from repositories.password_reset_repository import PasswordResetRepository

from services.email_service import EmailService

from schemas.auth_schema import (
    RegisterRequest,
    CurrentUser,
    CurrentUserResponse,
    LoginRequest,
    ResetPasswordRequest,
    
)

from utils.cookies import (
    set_refresh_cookie,
    clear_refresh_cookie,
)

from utils.password import (
    verify_password,
    hash_password,
)

from utils.logger import get_logger

logger = get_logger(__name__)


OTP_EXPIRY_MINUTES = 2


class AuthService:

    @staticmethod
    def refresh_access_token(
        request: Request,
        db: Session,
    ):
        refresh_token = request.cookies.get("refresh_token")

        if refresh_token is None:
            raise InvalidTokenError()

        payload = verify_refresh_token(refresh_token)

        user = UserRepository.get_by_id(
            db=db,
            user_id=payload["user_id"],
        )

        access_token = create_access_token(
            user_id=user.id,
            role=user.role,
            email=user.email,
        )

        return {
            "accessToken": access_token,
            "user": user,
        }

    @staticmethod
    def get_current_user(
        current_user: CurrentUser,
        db: Session,
    ):
        user = UserRepository.get_by_id(
            db=db,
            user_id=current_user.user_id,
        )

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found.",
            )

        return CurrentUserResponse(
            id=user.id,
            name=user.name,
            email=user.email,
            role=user.role,
        )

    @staticmethod
    def login(
        payload: LoginRequest,
        db: Session,
    ):
        logger.info("User login started.")

        user = UserRepository.get_by_email(
            db=db,
            email=payload.email,
        )

        if (
            user is None
            or user.password_hash is None
            or not verify_password(
                payload.password,
                user.password_hash,
            )
        ):
            logger.warning(f"Invalid login attempt. email={payload.email}")
            raise InvalidCredentialsError()

        access_token = create_access_token(
            user.id,
            user.role,
            user.email,
        )

        refresh_token = create_refresh_token(
            user.id,
            user.role,
        )

        response = JSONResponse(
            {
                "accessToken": access_token,
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                },
            }
        )

        set_refresh_cookie(
            response=response,
            refresh_token=refresh_token,
        )

        logger.info(f"User logged in successfully. user_id={user.id}")

        return response

    @staticmethod
    async def google_login(
        request: Request,
    ):
        logger.info("Google login initiated.")

        return await oauth.google.authorize_redirect(
            request=request,
            redirect_uri=settings.GOOGLE_LOGIN_CALLBACK_URI,
        )


    @staticmethod
    async def google_callback(
        request: Request,
        db: Session,
    ):
        logger.info("Google callback received.")

        try:
            token = await oauth.google.authorize_access_token(request=request)
            user_info = token["userinfo"]

            user = UserRepository.get_by_email(db=db, email=user_info["email"])

            if user is None:
                user = User(
                    name=user_info["name"],
                    email=user_info["email"],
                    role=UserRole.CANDIDATE,
                )
                user = UserRepository.create(db=db, user=user)
                logger.info(f"New Google user created. user_id={user.id}")

            refresh_token = create_refresh_token(user.id, user.role)

            response = RedirectResponse(
                url=f"{settings.FRONTEND_URL}/login",
                status_code=303,
            )

            set_refresh_cookie(response=response, refresh_token=refresh_token)

            logger.info(f"Google login successful. user_id={user.id}")

            return response

        except Exception:
            logger.exception("Google authentication failed.")
            raise GoogleAuthenticationError()



    @staticmethod
    def register(
        payload: RegisterRequest,
        db: Session,
    ):
        logger.info("User registration started.")
        
        existing_user = UserRepository.get_by_email(
            db=db,
            email=payload.email,
        )

        if existing_user:
            logger.warning(
                f"Registration attempted with existing email={payload.email}"
            )
            raise UserAlreadyExistsError()

        user = User(
            name=payload.name,
            email=payload.email,
            password_hash=hash_password(
                payload.password,
            ),
            role=payload.role,
        )

        user = UserRepository.create(
            db=db,
            user=user,
        )

        access_token = create_access_token(
            user.id,
            user.role,
            user.email,
        )

        refresh_token = create_refresh_token(
            user.id,
            user.role,
        )

        response = JSONResponse(
            {
                "access_token": access_token,
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                },
            }
        )

        set_refresh_cookie(
            response=response,
            refresh_token=refresh_token,
        )

        logger.info(f"User registered successfully. user_id={user.id}")

        return response

    @staticmethod
    def logout():
        logger.info("Logout request received.")

        response = JSONResponse(
            {
                "message": "Logged out successfully",
            }
        )

        clear_refresh_cookie(
            response=response,
        )

        logger.info("User logged out successfully.")

        return response

    @staticmethod
    async def forgot_password(email: str, db: Session):
        logger.info("Forgot password requested.")

        user = UserRepository.get_by_email(db=db, email=email)

        if user is None:
            raise UserNotFoundError()

        otp = generate_otp()
        otp_hash = hash_otp(otp)
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=OTP_EXPIRY_MINUTES)

        PasswordResetRepository.create(
            db=db,
            user_id=user.id,
            otp_hash=otp_hash,
            expires_at=expires_at,
        )

        await EmailService.send_otp_email(
            to=user.email,
            otp=otp,
            expiry_minutes=OTP_EXPIRY_MINUTES,
        )

        logger.info(f"OTP sent. user_id={user.id}")

        return {"message": "OTP sent to your email."}

    @staticmethod
    def reset_password(payload: ResetPasswordRequest, db: Session):
        logger.info("Password reset attempted.")

        user = UserRepository.get_by_email(db=db, email=payload.email)

        if user is None:
            raise UserNotFoundError()

        record = PasswordResetRepository.get_latest_valid(db=db, user_id=user.id)

        if record is None or not verify_otp(payload.otp, record.otp_hash):
            raise InvalidOTPError()

        user.password_hash = hash_password(payload.new_password)
        db.commit()

        PasswordResetRepository.mark_used(db=db, record=record)

        logger.info(f"Password reset successful. user_id={user.id}")

        return {"message": "Password reset successful."}