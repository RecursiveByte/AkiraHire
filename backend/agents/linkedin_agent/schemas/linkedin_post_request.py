from pydantic import BaseModel


class LinkedInPostGenerateRequest(BaseModel):
    description: str


class LinkedInPostConfirmRequest(BaseModel):
    draft_id: str
    approved: bool