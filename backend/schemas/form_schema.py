from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
)

from typing import Literal,Any

from schemas.validators import DescriptionStr

from enums.form_status_enum import FormStatus

class LinkField(BaseModel):

    id: str = Field(
        min_length=1,
    )

    label: str = Field(
        min_length=1,
    )

    required: bool


class AdditionalQuestion(BaseModel):

    id: str = Field(
        min_length=1,
    )

    question: str = Field(
        min_length=1,
    )

    type: Literal[
        "text",
        "textarea",
        "number",
        "date",
        "radio",
        "dropdown",
        "checkbox",
        "file",
    ]

    required: bool
    
    options: list[str] | None = None
    
    options: list[str] = Field(
    default_factory=list,
    )

    accepted_file_types: list[str] = Field(
    default_factory=list,
    )

class GenerateFormSchemaRequest(BaseModel):
    description: DescriptionStr

class GeneratedFormSchemaResponse(BaseModel):

    title: str = Field(
        min_length=1,
    )

    description: str = Field(
        min_length=1,
    )

    links: list[LinkField] = Field(
        default_factory=list,
    )

    additional_questions: list[
        AdditionalQuestion
    ] = Field(
        default_factory=list,
    )

    model_config = ConfigDict(
        extra="forbid",
        str_strip_whitespace=True,
    )
    
class CreateFormRequest(BaseModel):
    job_id: int
    form_schema_json: GeneratedFormSchemaResponse 
    expires_at: datetime


class CreateFormResponse(BaseModel):
    form_id: int
    job_id: int
    title: str
    status: FormStatus
    form_schema_json: GeneratedFormSchemaResponse 
    expires_at: datetime
    created_at: datetime
    updated_at: datetime

class GetFormResponse(BaseModel):
    form_id: int
    job_id: int
    title: str
    status: FormStatus
    form_schema_json: GeneratedFormSchemaResponse 
    expires_at: datetime
    created_at: datetime
    updated_at: datetime


class PublishFormResponse(BaseModel):
    form_id: int
    status: FormStatus


class CloseFormResponse(BaseModel):
    form_id: int
    status: FormStatus


class DeleteFormResponse(BaseModel):
    message: str