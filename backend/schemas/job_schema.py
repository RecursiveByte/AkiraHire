from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class JobCreate(BaseModel):

    role: str = Field(
        ...,
        min_length=2,
        max_length=150,
    )

    job_description: str = Field(
        ...,
        min_length=20,
    )

    expires_at: datetime

    model_config = ConfigDict(
        str_strip_whitespace=True,
    )



class JobResponse(BaseModel):

    job_id: int

    recruiter_id: int

    role: str

    job_description: str

    status: str

    application_deadline: datetime

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )