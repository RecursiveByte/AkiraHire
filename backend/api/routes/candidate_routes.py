from fastapi import APIRouter, Depends, Request, status, File, Form, UploadFile

from sqlalchemy.orm import Session

from database.session import get_db

from schemas.candidate_schema import (
    CandidateProfileCreate,
    CandidateProfileResponse,
    CandidateProfileUpdate,
    DeleteCandidateProfileResponse,
    CandidateProfileInput,
)

from enums.user_role_enum import UserRole

import json

from schemas.auth_schema import CurrentUser

from auth.dependencies.dependencies import require_role, get_current_user

from services.candidate_service import CandidateService

from core.document.service import ResumeService

from pydantic import ValidationError

from exceptions.candidate_exceptions import InvalidCandidateDataError

from utils.validation import validate_model
from fastapi_limiter.depends import RateLimiter

from auth.dependencies.rate_limit import DefaultRateLimit

router = APIRouter(
    prefix="/candidate",
    tags=["Candidate"],
    dependencies=[DefaultRateLimit],
)


@router.post(
    "/profile",
    response_model=CandidateProfileResponse,
)
def create_candidate_profile(
    candidate_data: str = Form(...),
    resume: UploadFile = File(...),
    current_user: CurrentUser = Depends(
        require_role(UserRole.CANDIDATE),
    ),
    db: Session = Depends(get_db),
):

    try:
        data = json.loads(candidate_data)
    except json.JSONDecodeError:
        raise InvalidCandidateDataError()

    candidate_input = validate_model(
        CandidateProfileInput,
        **data,
    )

    return CandidateService.create_candidate_profile(
        current_user=current_user,
        db=db,
        candidate_data=candidate_input,
        resume=resume,
    )


@router.get(
    "/profile/{candidate_id}",
    response_model=CandidateProfileResponse,
)
def get_candidate_profile_by_id(
    candidate_id: int,
    current_user: CurrentUser = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):

    return CandidateService.get_candidate_profile_by_id(
        candidate_id=candidate_id,
        db=db,
    )


@router.get(
    "/profile",
    response_model=CandidateProfileResponse,
)
def get_candidate_profile_by_user_id(
    current_user: CurrentUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return CandidateService.get_candidate_profile_by_user_id(
        current_user=current_user,
        db=db,
    )


@router.patch(
    "/profile",
    response_model=CandidateProfileResponse,
)
def update_my_candidate_profile(
    full_name: str | None = Form(default=None),
    phone: str | None = Form(default=None),
    resume: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(require_role(UserRole.CANDIDATE)),
):
    payload = validate_model(
        CandidateProfileUpdate,
        full_name=full_name,
        phone=phone,
    )
    return CandidateService.update_candidate_profile_by_current_user(
        current_user=current_user,
        db=db,
        candidate_data=payload,
        resume=resume,
    )


@router.delete(
    "/profile/{candidate_id}",
    response_model=DeleteCandidateProfileResponse,
)
def delete_candidate_profile(
    candidate_id: int,
    current_user: CurrentUser = Depends(
        require_role(UserRole.CANDIDATE, UserRole.ADMIN)
    ),
    db: Session = Depends(get_db),
):

    return CandidateService.delete_candidate_profile(
        candidate_id=candidate_id,
        current_user=current_user,
        db=db,
    )
