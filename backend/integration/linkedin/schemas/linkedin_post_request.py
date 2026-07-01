from pydantic import BaseModel

from schemas.validators import DescriptionStr

class LinkedInPostGenerateRequest(BaseModel):
    description: DescriptionStr


class LinkedInPostConfirmRequest(BaseModel):
    draft_id: str
    approved: bool