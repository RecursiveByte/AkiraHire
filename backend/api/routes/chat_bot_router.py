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
from fastapi.responses import StreamingResponse

from auth.dependencies import require_role
from enums.user_role_enum import UserRole

from database.session import get_db
from schemas.auth_schema import CurrentUser
from schemas.chat_schema import ChatRequest, AssistantResponse
from services.chatbot_service import ChatbotService

from services.chat_thread_service import ChatThreadService

from schemas.chat_schema import ChatHistoryResponse
from services.chat_message_service import ChatMessageService


from  schemas.chat_schema import ChatThreadResponse

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"],
)


@router.get(
    "/thread/{thread_id}/messages",
    response_model=ChatHistoryResponse,
)
def get_chat_history(
    thread_id: str,
    current_user: CurrentUser = Depends(require_role(UserRole.RECRUITER)),
    db: Session = Depends(get_db),
) -> ChatHistoryResponse:
    return ChatMessageService.get_chat_history(
        db=db,
        thread_id=thread_id,
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
    
# @router.post("/chat/stream")
# async def chat_stream(
    # request: ChatRequest,
    # current_user: CurrentUser = Depends(require_role(UserRole.RECRUITER)),
    # db: Session = Depends(get_db),
# ):
    # return StreamingResponse(
        # ChatbotService.stream_message(
            # db=db,
            # thread_id=request.thread_id,
            # message=request.message,
            # current_user=current_user,
        # ),
        # media_type="text/event-stream",
    # )

@router.get(
    "/conversations",
    response_model=list[ChatThreadResponse],
)
def get_conversations(
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(require_role(UserRole.RECRUITER,UserRole.ADMIN)),
):
    return ChatThreadService.get_all_threads(
        db=db,
        current_user=current_user,
    )