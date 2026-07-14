from typing import Optional

from pydantic import BaseModel


from datetime import datetime


class LinkedInDraftResponse(BaseModel):
    draft_id: str
    title: str
    post_text: str
    created_at: datetime

class LinkedInPostResponse(BaseModel):
    status: str
    post_id: Optional[str] = None
    error: Optional[str] = None


class LinkedInConnectionStatusResponse(BaseModel):
    connected: bool