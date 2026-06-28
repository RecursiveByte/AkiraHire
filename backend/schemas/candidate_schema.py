from pydantic import BaseModel, EmailStr, Field, ConfigDict


class CandidateProfileCreate(BaseModel):
    full_name: str = Field(
        ...,
        min_length=2,
        max_length=150,
    )

    email: EmailStr

    phone: str = Field(
        ...,
        min_length=10,
        max_length=20,
    )

    resume_url: str

    model_config = ConfigDict(
        str_strip_whitespace=True,
    )


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