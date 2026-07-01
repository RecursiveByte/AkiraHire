from pydantic import BaseModel, EmailStr, Field, ConfigDict,HttpUrl

from schemas.validators import PhoneNumber

class CandidateProfileCreate(BaseModel):
    full_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    phone: PhoneNumber = Field(
        ...,
        min_length=11,
        max_length=20,
    )

    resume_url: HttpUrl

    model_config = ConfigDict(
        str_strip_whitespace=True,
    )
    
class CandidateProfileUpdate(BaseModel):
    full_name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    email: EmailStr | None = None

    phone: str | None = Field(
        default=None,
        min_length=10,
        max_length=20,
    )

    resume_url: HttpUrl | None = None

    model_config = ConfigDict(
        str_strip_whitespace=True,
    )

class DeleteCandidateProfileResponse(
    BaseModel,
):
    message: str

class CandidateProfileResponse(BaseModel):
    candidate_id: int
    user_id: int
    full_name: str
    email: str
    phone: str
    resume_url: str

    model_config = ConfigDict(
        from_attributes=True,
    )