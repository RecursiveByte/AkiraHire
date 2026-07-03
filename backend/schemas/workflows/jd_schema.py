from datetime import datetime
from pydantic import BaseModel, Field


class JDRunRequest(BaseModel):
    description: str = Field(min_length=10)
    role: str = Field(min_length=2, max_length=150)
    application_deadline: datetime


class JDResumeRequest(BaseModel):
    approved: bool