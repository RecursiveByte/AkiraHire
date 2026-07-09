from fastapi import (
    APIRouter,
    Depends,
    status
)

from sqlalchemy.orm import Session

from database.session import get_db

from auth.dependencies import (
    require_role,
)

from schemas.auth_schema import (
    CurrentUser,
)

from schemas.application_evaluation_schema import (
    EvaluateApplicationResponse,ApplicationEvaluationResponse
)

from services.application_evaluation_service import (
    ApplicationEvaluationService,
)

from enums.user_role_enum import UserRole

router = APIRouter(
    prefix="/application-evaluations",
    tags=["Application Evaluations"],

)

@router.post(
    "/{application_id}/evaluate",
    response_model=EvaluateApplicationResponse,
    status_code=status.HTTP_201_CREATED
)
def evaluate_application(
    application_id: int,
    current_user: CurrentUser = Depends(
        require_role(UserRole.RECRUITER)
    ),
    db: Session = Depends(
        get_db,
    ),
):

    return (
        ApplicationEvaluationService.evaluate_application(
            application_id=application_id,
            db=db,
        )
    )
    
@router.get(
    "/recruiter",
    response_model=list[ApplicationEvaluationResponse],
)
def get_my_evaluated_applications(
    current_user: CurrentUser = Depends(require_role(UserRole.RECRUITER)),
    db: Session = Depends(get_db),
):
    return ApplicationEvaluationService.get_all_by_recruiter_id(
        db=db,
        recruiter_id=current_user.user_id,
    )
    
@router.get("/")
def get_all_application_evaluations(
    db: Session = Depends(get_db),
                current_user: dict = Depends(

    require_role(UserRole.RECRUITER)

),
):
    return ApplicationEvaluationService.get_all_evaluations(
        db=db,
    )