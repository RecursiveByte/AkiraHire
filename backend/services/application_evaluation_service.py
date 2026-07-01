from sqlalchemy.orm import Session

from core.llm.llm_client import get_llm

from core.document.service import (
    ResumeService,
)

from schemas.application_evaluation_schema import ApplicationEvaluationContext

from repositories.application_repository import (
    ApplicationRepository,
)

from prompts.application_evaluation_prompt import SYSTEM_PROMPT, HUMAN_PROMPT

from database.models.application_evaluation import ApplicationEvaluation
from database.models.application import Application

from repositories.application_answer_repository import ApplicationQuestionRepository
from repositories.application_link_repository import ApplicationLinksRepository

from repositories.form_repository import FormRepository

from repositories.job_repository import JobRepository

from repositories.application_evaluation_repository import (
    ApplicationEvaluationRepository,
)

from schemas.application_evaluation_schema import (
    EvaluateApplicationResponse,
    GeneratedApplicationEvaluation,
)

from exceptions.application_exceptions import (
    ApplicationNotFoundError,
)

from exceptions.application_evaluation_exceptions import (
    ApplicationAlreadyEvaluatedError,
    ApplicationEvaluationFailedError,
)

from services.candidate_service import CandidateService

from utils.logger import get_logger
from utils.clean_json import clean_json

logger = get_logger(__name__)


class ApplicationEvaluationService:

    @staticmethod
    def evaluate_application(
        application_id: int,
        db: Session,
    ) -> EvaluateApplicationResponse:

        logger.info(
            f"Evaluating application. " f"application_id={application_id}"
        )

        existing_evaluation = ApplicationEvaluationRepository.get_by_application_id(
            db=db,
            application_id=application_id,
        )

        if existing_evaluation:

            logger.warning(
                f"Application already evaluated. "
                f"application_id={application_id}"
            )

            raise ApplicationAlreadyEvaluatedError()

        application = ApplicationRepository.get_by_id(
            db=db,
            application_id=application_id,
        )

        if not application:

            logger.warning(
                f"Application not found. " f"application_id={application_id}"
            )

            raise ApplicationNotFoundError()

        evaluation_context = ApplicationEvaluationService._get_application_context(
            application=application,
            db=db,
        )

        evaluation = ApplicationEvaluationService._evaluate_with_llm(
            context=evaluation_context,
        )

        application_evaluation = ApplicationEvaluationService._save_evaluation(
            application_id=application.application_id,
            evaluation=evaluation,
            db=db,
        )

        logger.info(
            f"Application evaluated successfully. "
            f"application_id={application_id}"
        )

        return EvaluateApplicationResponse(
            application_id=application.application_id,
            match_score=application_evaluation.match_score,
            reasoning=application_evaluation.reasoning,
            status=application_evaluation.status,
        )

    @staticmethod
    def _get_application_context(
        application : Application,
        db: Session,
    ) -> ApplicationEvaluationContext:

        candidate_profile = CandidateService.get_candidate_profile_by_application_id(
            db=db,
            application_id=application.application_id,
        )

        resume_content = ResumeService.read_resume(
            resume_url=candidate_profile.resume_url,
        )

        form = FormRepository.get_by_id(
            db=db,
            form_id=application.form_id,
        )

        job = JobRepository.get_by_job_id(
            db=db,
            job_id=form.job_id,
        )

        application_answers = ApplicationQuestionRepository.get_by_application_id(
            db=db,
            application_id=application.application_id,
        )

        application_links = ApplicationLinksRepository.get_by_application_id(
            db=db,
            application_id=application.application_id,
        )

        return ApplicationEvaluationContext(
            job_description=job.job_description,
            resume=resume_content,
            answers=application_answers.answers_json,
            links=application_links.links_json,
            candidate_name=candidate_profile.full_name,
            candidate_email=candidate_profile.email,
        )

    @staticmethod
    def _evaluate_with_llm(
        context: ApplicationEvaluationContext,
    ) -> GeneratedApplicationEvaluation:

        logger.info("Evaluating application using LLM.")

        llm = get_llm()

        response = llm.invoke(
            [
                (
                    "system",
                    SYSTEM_PROMPT,
                ),
                (
                    "human",
                    HUMAN_PROMPT.format(
                        job_description=context.job_description,
                        resume=context.resume,
                        answers=context.answers,
                        links=context.links,
                    ),
                ),
            ]
        )

        cleaned_response = clean_json(
            response.content,
        )

        try:

            return GeneratedApplicationEvaluation.model_validate_json(
                cleaned_response,
            )

        except Exception as e:

            logger.exception("LLM returned an invalid evaluation.")

            raise ApplicationEvaluationFailedError() from e

    @staticmethod
    def _save_evaluation(
        application_id: int,
        evaluation: GeneratedApplicationEvaluation,
        db: Session,
    ) -> ApplicationEvaluation:

        logger.info(f"Saving evaluation for application_id={application_id}.")

        application_evaluation = ApplicationEvaluation(
            application_id=application_id,
            match_score=evaluation.match_score,
            reasoning=evaluation.reasoning,
            status=evaluation.status,
        )

        application_evaluation = ApplicationEvaluationRepository.create(
            db=db,
            application_evaluation=application_evaluation,
        )

        logger.info(
            f"Evaluation saved successfully. " f"application_id={application_id}"
        )

        return application_evaluation
