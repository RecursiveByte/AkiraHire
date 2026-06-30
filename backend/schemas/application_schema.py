from datetime import datetime

from pydantic import (
    BaseModel,
    EmailStr,
)

# from schemas.form_schema import (
    # LinkField,
    # AdditionalQuestion,
# )


class CandidateProfileRequest(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    resume_url: str


class ApplicationLinkRequest(BaseModel):
    label: str
    url: str


class ApplicationAnswerRequest(BaseModel):
    question_id: str
    answer: str


class CreateApplicationRequest(BaseModel):
    form_id: int
    candidate_profile: CandidateProfileRequest
    links: list[ApplicationLinkRequest] = []
    answers: list[ApplicationAnswerRequest] = []


class CreateApplicationResponse(BaseModel):
    application_id: int
    form_id: int
    submitted_at: datetime
    
class GetApplicationResponse(BaseModel):
    application_id: int
    form_id: int
    candidate_profile: CandidateProfileRequest
    links: list[ApplicationLinkRequest]
    answers: list[ApplicationAnswerRequest]
    submitted_at: datetime
    
class UpdateApplicationRequest(BaseModel):
    candidate_profile: CandidateProfileRequest
    links: list[ApplicationLinkRequest] = []
    answers: list[ApplicationAnswerRequest] = []


class UpdateApplicationResponse(BaseModel):
    application_id: int
    form_id: int
    candidate_profile: CandidateProfileRequest
    links: list[ApplicationLinkRequest]
    answers: list[ApplicationAnswerRequest]
    submitted_at: datetime
    
class DeleteApplicationResponse(BaseModel):
    message: str