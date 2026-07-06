from typing import Literal

from pydantic import BaseModel


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