from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import require_role,get_current_user
from database.session import get_db
from integration.schemas import IntegrationResponse
from integration.service import IntegrationService

from enums.user_role_enum import UserRole
from schemas.auth_schema import CurrentUser

router = APIRouter(
    prefix="/integrations",
    tags=["Integrations"],
)


@router.get(
    "/",
    response_model=list[IntegrationResponse],
)
def get_integrations(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[IntegrationResponse]:

    return IntegrationService.get_integrations(
        db=db,
        user_id=current_user.user_id,
    )
    
@router.delete("/connected-accounts/{account_id}")
def disconnect_account(
    account_id: int,
    current_user:CurrentUser =Depends(require_role(UserRole.RECRUITER)),
    db: Session = Depends(get_db),
) -> dict:
    IntegrationService.disconnect_account(
        db=db,
        user_id=current_user.user_id,
        account_id=account_id,
    )

    return {"detail": "Disconnected successfully"}