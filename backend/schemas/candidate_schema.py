from pydantic import BaseModel, EmailStr, Field, ConfigDict, HttpUrl

from schemas.validators import PhoneNumber

from datetime import datetime


class CandidateProfileInput(BaseModel):

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

    model_config = ConfigDict(
        str_strip_whitespace=True,
    )


class CandidateProfileCreate(CandidateProfileInput):
    resume_url: HttpUrl


class CandidateProfileUpdate(BaseModel):
    full_name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    phone: PhoneNumber = Field(
        ...,
        min_length=11,
        max_length=20,
    )

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
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )
