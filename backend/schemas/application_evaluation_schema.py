from pydantic import (
    BaseModel,
    ConfigDict,
)

from typing import Any

from enums.application_evaluation_enum import (
    ApplicationEvaluationStatus,
)

from datetime import datetime


from schemas.application_schema import (
    ApplicationAnswerRequest,
    ApplicationLinkRequest
)

class EvaluateApplicationResponse(
    BaseModel,
):
    application_id: int
    match_score: int
    reasoning: str
    status: ApplicationEvaluationStatus

    model_config = ConfigDict(
        from_attributes=True,
    )
    
class GeneratedApplicationEvaluation(
    BaseModel,
):
    match_score: int
    reasoning: str
    status: ApplicationEvaluationStatus
    
    
class EvaluationAnswer(BaseModel):
    question: str
    type: str
    answer: Any
    
class EvaluationLink(BaseModel):
    title: str
    url: str
        
class ApplicationEvaluationContext(BaseModel):
    job_description: str
    resume: str
    answers: list[EvaluationAnswer]
    links: list[EvaluationLink]
    
class ApplicationEvaluationResponse(BaseModel):
    application_id: int
    match_score: int
    reasoning: str
    status: ApplicationEvaluationStatus
    evaluated_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )
    
    


class DeleteApplicationEvaluationResponse(BaseModel):
    message: str