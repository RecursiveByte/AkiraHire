from fastapi import (
    APIRouter,
    Depends,
    Request,
)

from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from database.session import get_db

from schemas.auth_schema import AuthResponse, RegisterRequest, LoginRequest, CurrentUser,ForgotPasswordRequest,ResetPasswordRequest

from services.auth_service import AuthService

from auth.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/refresh")
async def refresh(request: Request, db: Session = Depends(get_db)):
    return AuthService.refresh_access_token(request, db)


@router.get("/me")
async def get_current_user_details(
    current_user: CurrentUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return AuthService.get_current_user(
        current_user=current_user,
        db=db,
    )


@router.post(
    "/login",
    response_model=AuthResponse,
)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db),
):
    return AuthService.login(
        payload=payload,
        db=db,
    )


@router.get("/google/login")
async def google_login(
    request: Request,
):

    return await AuthService.google_login(
        request=request,
    )


@router.get(
    "/google/callback",
)
async def google_callback(
    request: Request,
    db: Session = Depends(get_db),
):

    return await AuthService.google_callback(
        request=request,
        db=db,
    )


@router.post(
    "/signup",
    response_model=AuthResponse,
)
async def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db),
):

    return AuthService.register(
        payload=payload,
        db=db,
    )


@router.post("/logout")
async def logout(
    current_user: CurrentUser = Depends(get_current_user),
):

    return AuthService.logout()


@router.post("/forgot-password")
async def forgot_password(
    payload: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    return await AuthService.forgot_password(email=payload.email, db=db)


@router.post("/reset-password")
def reset_password(
    payload: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    return AuthService.reset_password(payload=payload, db=db)
