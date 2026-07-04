from typing import Literal

from pydantic import BaseModel


class ChatRequest(BaseModel):
    thread_id: str
    message: str


class AssistantResponse(BaseModel):
    role: Literal["assistant"]
    content: str
    
    
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import require_role
from enums.user_role_enum import UserRole

from database.session import get_db
from schemas.auth_schema import CurrentUser
from schemas.chat_schema import ChatRequest, AssistantResponse
from services.chatbot_service import ChatbotService

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"],
)


@router.post("/chat")
def chat(
    request: ChatRequest,
    current_user: CurrentUser = Depends(require_role(UserRole.RECRUITER)),
    db: Session = Depends(get_db),
) -> AssistantResponse:
    return ChatbotService.handle_message(
        db=db,
        thread_id=request.thread_id,
        message=request.message,
        current_user=current_user,
    )