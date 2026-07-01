from pydantic import (
    BaseModel,
    ConfigDict,
)

from enums.application_evaluation_enum import (
    ApplicationEvaluationStatus,
)


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
    
class ApplicationEvaluationContext(BaseModel):
    job_description: str
    resume: str
    answers: list[ApplicationAnswerRequest]
    links: list[ApplicationLinkRequest]
    candidate_name: str
    candidate_email: str