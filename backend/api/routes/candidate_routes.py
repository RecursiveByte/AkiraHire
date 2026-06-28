from fastapi import (
    APIRouter,
    Depends,
    Request,
    status,
)

from sqlalchemy.orm import Session

from database.session import get_db

from schemas.candidate_schema import (
    CandidateProfileCreate,
    CandidateProfileResponse,
)

from services.candidate_service import CandidateService


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
    candidate_data: CandidateProfileCreate,
    db: Session = Depends(get_db),
):

    return CandidateService.create_candidate_profile(
        request=request,
        db=db,
        candidate_data=candidate_data,
    )