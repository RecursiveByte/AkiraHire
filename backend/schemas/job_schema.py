from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from schemas.validators import DescriptionStr,validate_str

from typing import Annotated
from pydantic import AfterValidator

roleStr =  Annotated[str, AfterValidator(validate_str)]

class JobCreate(BaseModel):

    role: roleStr = Field(
        ...,
        min_length=2,
        max_length=150,
    )

    job_description: str = Field(
        ...,
        min_length=20,
    )

    application_deadline: datetime

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
    
    
class JobUpdate(BaseModel):
    role: str | None = Field(default=None, min_length=2, max_length=100)
    job_description: str | None = Field(default=None, min_length=10)
    application_deadline: datetime | None = None

    model_config = ConfigDict(str_strip_whitespace=True)
    
class DeleteJobResponse(BaseModel):
    message: DescriptionStr
    
class GenerateJobDescriptionRequest(BaseModel):
    description: str
        
# class GenerateJobDescriptionResponse(BaseModel):
    # job_description: str

class GenerateJobDescriptionResponse(BaseModel):
    role: str = Field(description="The job title/role")
    job_description: str = Field(description="The full generated job description")
    application_deadline: datetime = Field(description="Suggested application deadline")
    
