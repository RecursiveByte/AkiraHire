from fastapi import (
    APIRouter,
    Depends,
    Request,
    status,
    File,
    Form,
    UploadFile
)

from sqlalchemy.orm import Session

from database.session import get_db

from schemas.candidate_schema import (
    CandidateProfileCreate,
    CandidateProfileResponse,
    CandidateProfileUpdate,
    DeleteCandidateProfileResponse,
    CandidateProfileInput
)

from enums.user_role_enum import UserRole

import json

from schemas.auth_schema import CurrentUser

from auth.dependencies import require_role,get_current_user

from services.candidate_service import CandidateService

from core.document.service import ResumeService

from pydantic import ValidationError

from exceptions.candidate_exceptions import InvalidCandidateDataError


router = APIRouter(
    prefix="/candidate",
    tags=["Candidate"],
)


@router.post(
    "/profile",
    response_model=CandidateProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_candidate_profile(
    request: Request,
    candidate_data: str = Form(...),
    resume: UploadFile = File(...),
    current_user: CurrentUser = Depends(
        require_role(UserRole.CANDIDATE),
    ),
    db: Session = Depends(get_db),
):

    try:
        candidate_input = CandidateProfileInput(
            **json.loads(candidate_data),
        )
    except (json.JSONDecodeError, ValidationError):
        raise InvalidCandidateDataError()

    resume_url = ResumeService.upload_resume(
        file=resume,
    )

    candidate_data_parsed = CandidateProfileCreate(
        **candidate_input.model_dump(),
        resume_url=resume_url,
    )

    return CandidateService.create_candidate_profile(
        db=db,
        candidate_data=candidate_data_parsed,
        current_user=current_user,
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
    
@router.patch(
    "/profile/{candidate_id}",
    response_model=CandidateProfileResponse,
)

def update_candidate_profile(
    candidate_id: int,
    candidate_data: CandidateProfileUpdate,
    current_user: CurrentUser = Depends(
        require_role(UserRole.CANDIDATE,UserRole.ADMIN),
    ),
    db: Session = Depends(get_db), 
):

    return CandidateService.update_candidate_profile(
        candidate_id=candidate_id,
        current_user=current_user,
        db=db,
        candidate_data=candidate_data,
    )


@router.delete(
    "/profile/{candidate_id}",
    response_model=DeleteCandidateProfileResponse,
)

def delete_candidate_profile(
    candidate_id: int,
    current_user: CurrentUser = Depends(
        require_role(UserRole.CANDIDATE,UserRole.ADMIN)
    ),
    db: Session = Depends(get_db),
):

    return CandidateService.delete_candidate_profile(
        candidate_id=candidate_id,
        current_user=current_user,
        db=db,
    )