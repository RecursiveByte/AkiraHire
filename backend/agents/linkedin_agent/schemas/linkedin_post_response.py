from pydantic import BaseModel
from typing import Optional


class LinkedInDraftResponse(BaseModel):
    draft_id: str
    post_text: str


class LinkedInPostResponse(BaseModel):
    status: str
    post_id: Optional[str] = None