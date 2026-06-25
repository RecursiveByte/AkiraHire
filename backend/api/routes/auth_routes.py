from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session

from database.session import get_db
from services.auth_service import (
    google_login_service,
    google_callback_service,
    register_user,
    logout_user
)

from schemas.auth_schema import AuthResponse,RegisterRequest

from fastapi.responses import FileResponse

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.get("/")
async def home():
    return FileResponse("static/google_form_agent.html")

@router.get("/google/login")
async def google_login(
    request: Request,
):
    return await google_login_service(
        request=request,
    )


@router.get("/google/callback",response_model=AuthResponse)
async def google_callback(
    request: Request,
    db: Session = Depends(get_db),
):
    return await google_callback_service(
        request=request,
        db=db,
    )
    
    
@router.post("/register", response_model=AuthResponse)
async def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    return register_user(payload, db)

@router.post("/logout")
def logout(request: Request):
    return logout_user(request)