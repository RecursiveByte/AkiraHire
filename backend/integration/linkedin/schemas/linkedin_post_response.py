from typing import Optional

from pydantic import BaseModel


class LinkedInDraftResponse(BaseModel):
    draft_id: str
    post_text: str


class LinkedInPostResponse(BaseModel):
    status: str
    post_id: Optional[str] = None
    error: Optional[str] = None


class LinkedInConnectionStatusResponse(BaseModel):
    connected: bool