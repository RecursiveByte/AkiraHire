from typing import Literal

from pydantic import BaseModel


class ChatRequest(BaseModel):
    thread_id: str
    message: str


class AssistantResponse(BaseModel):
    role: Literal["assistant"]
    content: str