from sqlalchemy.orm import Session

from database.models.application import (
    Application,
)

from repositories.application_repository import (
    ApplicationRepository,
)

from repositories.candidate_repository import (
    CandidateRepository
)

from repositories.application_link_repository import (
    ApplicationLinksRepository,
)

from repositories.application_answer_repository import (
    ApplicationQuestionRepository,
)

from repositories.form_repository import (
    FormRepository,
)

from services.candidate_service import (
    CandidateService,
)

from services.application_links_service import (
    ApplicationLinksService,
)

from services.application_question_service import (
    ApplicationQuestionService,
)

from schemas.application_schema import (
    CreateApplicationRequest,
    CreateApplicationResponse,
    UpdateApplicationRequest,
    UpdateApplicationResponse,
    DeleteApplicationResponse,
)

from exceptions.application_exceptions import ApplicationNotFoundError

from exceptions.form_exceptions import (
    FormNotFoundError,
)

from exceptions.application_exceptions import (
    CandidateProfileNotFoundError
)

from schemas.auth_schema import CurrentUser

from utils.logger import get_logger

logger = get_logger(__name__)


class ApplicationService:
   
    @staticmethod
    def create_application(
        current_user: CurrentUser,
        payload: CreateApplicationRequest,
        db: Session,
    ) -> CreateApplicationResponse:

        logger.info(
            f"Creating application for form_id={payload.form_id}."
        )

        form = FormRepository.get_by_id(
            db=db,
            form_id=payload.form_id,
        )

        if not form:

            logger.warning(
                f"Form not found. form_id={payload.form_id}"
            )

            raise FormNotFoundError()

        candidate_profile = (
            CandidateRepository.get_by_user_id(
                db=db,
                user_id=current_user.user_id,
            )
        )
        

        if not candidate_profile:

            logger.warning(
                f"Candidate profile not found. "
                f"user_id={current_user.user_id}"
            )

            raise CandidateProfileNotFoundError()

        application = Application(
            form_id=payload.form_id,
            candidate_id=candidate_profile.candidate_id,
        )

        created_application = (
            ApplicationRepository.create(
                db=db,
                application=application,
            )
        )

        ApplicationLinksService.create_links(
            application_id=created_application.application_id,
            payload=payload.links,
            db=db,
        )

        ApplicationQuestionService.create_questions(
            application_id=created_application.application_id,
            payload=payload.answers,
            db=db,
        )

        logger.info(
            f"Application created successfully. "
            f"application_id={created_application.application_id}"
        )

        return CreateApplicationResponse(
            application_id=created_application.application_id,
            form_id=created_application.form_id,
            candidate_id=created_application.candidate_id,
            submitted_at=created_application.submitted_at,
        )

    @staticmethod
    def update_application(
        application_id: int,
        payload: UpdateApplicationRequest,
        db: Session,
    ) -> UpdateApplicationResponse:

        logger.info(f"Updating application_id={application_id}.")

        application = ApplicationRepository.get_by_id(
            db=db,
            application_id=application_id,
        )

        if not application:

            logger.warning(f"Application not found. application_id={application_id}")

            raise ApplicationNotFoundError()

        candidate_profile = CandidateService.get_candidate_profile_by_application_id(
            application_id=application_id,
            db=db,
        )

        candidate_profile.full_name = payload.candidate_profile.full_name
        candidate_profile.email = payload.candidate_profile.email
        candidate_profile.phone = payload.candidate_profile.phone
        candidate_profile.resume_url = payload.candidate_profile.resume_url

        CandidateRepository.update(
            db=db,
            candidate_profile=candidate_profile,
        )

        application_links = ApplicationLinksRepository.get_by_application_id(
            db=db,
            application_id=application_id,
        )

        application_links.links_json = [link.model_dump() for link in payload.links]

        ApplicationLinksRepository.update(
            db=db,
            application_links=application_links,
        )

        application_questions = ApplicationQuestionRepository.get_by_application_id(
            db=db,
            application_id=application_id,
        )

        application_questions.answers_json = [
            answer.model_dump() for answer in payload.answers
        ]

        ApplicationQuestionRepository.update(
            db=db,
            application_question=application_questions,
        )

        logger.info(
            f"Application updated successfully. application_id={application_id}"
        )

        return UpdateApplicationResponse(
            application_id=application.application_id,
            form_id=application.form_id,
            candidate_profile=payload.candidate_profile,
            links=payload.links,
            answers=payload.answers,
            submitted_at=application.submitted_at,
        )


    @staticmethod
    def delete_application(
        application_id: int,
        db: Session,
    ) -> DeleteApplicationResponse:

        logger.info(f"Deleting application_id={application_id}.")

        application = ApplicationRepository.get_by_id(
            db=db,
            application_id=application_id,
        )

        if not application:

            logger.warning(f"Application not found. application_id={application_id}")

            raise ApplicationNotFoundError()

        ApplicationRepository.delete(
            db=db,
            application=application,
        )

        logger.info(
            f"Application deleted successfully. application_id={application_id}"
        )

        return DeleteApplicationResponse(message="Application deleted successfully.")
