from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.session import get_db
from auth.dependencies import require_role
from services.chat_thread_service import ChatThreadService
from schemas.chat_thread_schema import ChatThreadDeleteResponse
from enums.user_role_enum import UserRole

router = APIRouter(prefix="/assistant", tags=["Assistant"])



@router.delete("/threads/{thread_id}",response_model=ChatThreadDeleteResponse)
def delete_chat_thread(
    thread_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(require_role(UserRole.RECRUITER)),
):
    return ChatThreadService.delete_thread(
        db=db,
        thread_id=thread_id,
        user_id=current_user.user_id,
    )