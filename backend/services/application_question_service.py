from sqlalchemy.orm import Session

from database.models.application_questions import (
    ApplicationQuestion,
)

from repositories.application_answer_repository import (
    ApplicationQuestionRepository,
)

from schemas.application_schema import (
    ApplicationAnswerRequest,
)

from utils.logger import get_logger

logger = get_logger(__name__)


class ApplicationQuestionService:

    @staticmethod
    def create_questions(
        application_id: int,
        payload: list[ApplicationAnswerRequest],
        db: Session,
    ) -> ApplicationQuestion:

        logger.info(
            f"Creating application questions for application_id={application_id}."
        )

        application_question = ApplicationQuestion(
            application_id=application_id,
            answers_json=[
                answer.model_dump()
                for answer in payload
            ],
        )

        created_questions = (
            ApplicationQuestionRepository.create(
                db=db,
                application_question=application_question,
            )
        )

        logger.info(
            f"Application questions created successfully for application_id={application_id}."
        )

        return created_questions