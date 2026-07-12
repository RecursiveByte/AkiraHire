from pydantic import BaseModel


class ChatThreadDeleteResponse(BaseModel):
    message: str