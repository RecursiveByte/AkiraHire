from fastapi import (
    APIRouter,
    Depends,
    Request,
    UploadFile,
    File,
)

from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from database.session import get_db

from schemas.auth_schema import (
    AuthResponse,
    RegisterRequest,
)

from services.auth_service import AuthService


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.get("/")
async def home():

    return FileResponse(
        "static/google_form_agent.html",
    )


@router.get("/form")
async def form():

    return FileResponse(
        "static/form.html",
    )

@router.post(
    "/login",
    response_model=AuthResponse,
)
async def login(
    payload: RegisterRequest, 
    db: Session = Depends(get_db),
):
    return await AuthService.login(
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
    response_model=AuthResponse,
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
    "/register",
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
    request: Request,
):

    return AuthService.logout(
        request=request,
    )