from typing import Literal,Optional

from pydantic import BaseModel

from uuid import UUID
from datetime import datetime

class ChatRequest(BaseModel):
    thread_id: str
    message: str


class AssistantResponse(BaseModel):
    role: Literal["assistant"]
    content: str
    
class ChatMessageResponse(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatHistoryResponse(BaseModel):
    messages: list[ChatMessageResponse]


class ChatRequest(BaseModel):
    thread_id: Optional[str] = None
    message: str
    
class ChatThreadResponse(BaseModel):
    id: UUID
    title: str
    updated_at: datetime