from sqlalchemy.orm import Session

from database.models.application import (
    Application,
)

from repositories.application_repository import (
    ApplicationRepository,
)

from repositories.candidate_repository import CandidateRepository

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

from services.form_service import FormService

from services.application_links_service import (
    ApplicationLinksService,
)

from services.application_evaluation_service import ApplicationEvaluationService

from services.application_question_service import (
    ApplicationQuestionService,
)

from services.job_service import JobService

from schemas.application_schema import (
    CreateApplicationRequest,
    CreateApplicationResponse,
    UpdateApplicationRequest,
    UpdateApplicationResponse,
    DeleteApplicationResponse,
    GetApplicationResponse,
    ApplicationLinkRequest,
    CandidateProfileRequest,
    ApplicationAnswerRequest,
)


from exceptions.application_exceptions import (
    ApplicationNotFoundError,
    ApplicationAlreadyExistsError,
)

from exceptions.form_exceptions import (
    FormNotFoundError,
)

from exceptions.application_exceptions import CandidateProfileNotFoundError

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

        logger.info(f"Creating application for form_id={payload.form_id}.")

        form = FormRepository.get_by_id(
            db=db,
            form_id=payload.form_id,
        )

        if not form:

            logger.warning(f"Form not found. form_id={payload.form_id}")

            raise FormNotFoundError()

        candidate_profile = CandidateRepository.get_by_user_id(
            db=db,
            user_id=current_user.user_id,
        )

        if not candidate_profile:

            logger.warning(
                f"Candidate profile not found. " f"user_id={current_user.user_id}"
            )

            raise CandidateProfileNotFoundError()

        application = Application(
            form_id=payload.form_id,
            candidate_id=candidate_profile.candidate_id,
        )

        existing_application = ApplicationRepository.get_by_form_id_and_candidate_id(
            db=db,
            form_id=payload.form_id,
            candidate_id=candidate_profile.candidate_id,
        )

        if existing_application:
            logger.warning(
                f"Duplicate application attempt. "
                f"form_id={payload.form_id}, candidate_id={candidate_profile.candidate_id}"
            )
            raise ApplicationAlreadyExistsError()

        created_application = ApplicationRepository.create(
            db=db,
            application=application,
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
    def get_application_by_id(
        application_id: int,
        db: Session,
    ) -> GetApplicationResponse:

        application = ApplicationRepository.get_by_id(
            db=db,
            application_id=application_id,
        )

        if application is None:
            raise ApplicationNotFoundError()

        candidate_profile = CandidateService.get_candidate_profile_by_application_id(
            db=db,
            application_id=application_id,
        )

        application_links = ApplicationLinksRepository.get_by_application_id(
            db=db,
            application_id=application_id,
        )

        application_answers = ApplicationQuestionRepository.get_by_application_id(
            db=db,
            application_id=application_id,
        )

        return GetApplicationResponse(
            application_id=application.application_id,
            form_id=application.form_id,
            candidate_profile=CandidateProfileRequest(
                full_name=candidate_profile.full_name,
                email=candidate_profile.email,
                phone=candidate_profile.phone,
                resume_url=candidate_profile.resume_url,
            ),
            links=[
                ApplicationLinkRequest(
                    id=link["id"],
                    url=link["url"],
                )
                for link in application_links.links_json
            ],
            answers=[
                ApplicationAnswerRequest(
                    id=answer["id"],
                    answer=answer["answer"],
                )
                for answer in application_answers.answers_json
            ],
            submitted_at=application.submitted_at,
        )

    @staticmethod
    def get_applications_by_recruiter_id(
        recruiter_id: int,
        db: Session,
    ):
        return ApplicationRepository.get_by_recruiter_id(
            db=db,
            recruiter_id=recruiter_id,
        )

    @staticmethod
    def get_application_with_form(
        application_id: int,
        db: Session,
    ):

        application = ApplicationService.get_application_by_id(
            application_id=application_id,
            db=db,
        )

        form = FormService.get_form_by_id(
            form_id=application.form_id,
            db=db,
        )

        job = JobService.get_job_by_job_id(
            job_id=form.job_id,
            db=db,
        )

        evaluation = ApplicationEvaluationService.get_by_application_id(
            application_id=application_id,
            db=db,
        )

        status = evaluation.status if evaluation else "UNDER_REVIEW"

        link_map = {link.id: link.url for link in application.links}

        answer_map = {answer.id: answer.answer for answer in application.answers}

        merged_links = []

        for link in form.form_schema_json.links:
            merged_links.append(
                {
                    "id": link.id,
                    "label": link.label,
                    "required": link.required,
                    "value": link_map.get(link.id),
                }
            )

        merged_questions = []

        for question in form.form_schema_json.additional_questions:
            merged_questions.append(
                {
                    "id": question.id,
                    "question": question.question,
                    "type": question.type,
                    "required": question.required,
                    "options": question.options,
                    "accepted_file_types": question.accepted_file_types,
                    "answer": answer_map.get(question.id),
                }
            )
        return {
            "application_id": application.application_id,
            "submitted_at": application.submitted_at,
            "status": status,
            "candidate_profile": application.candidate_profile,
            "job": {
                "job_id": job.job_id,
                "role": job.role,
            },
            "form": {
                "form_id": form.form_id,
                "title": form.title,
                "description": form.form_schema_json.description,
                "status": form.status,
            },
            "links": merged_links,
            "questions": merged_questions,
        }


    @staticmethod
    def get_recruiter_applications(
        recruiter_id: int,
        db: Session,
        search: str | None,
    ):
    
        applications = ApplicationRepository.search_recruiter_applications(
            db=db,
            recruiter_id=recruiter_id,
            search=search,
        )
    
        return [
            ApplicationService.get_application_with_form(
                application_id=application.application_id,
                db=db,
            )
            for application in applications
        ]

    @staticmethod
    def get_applications_by_candidate_id(
        candidate_id: int,
        db: Session,
    ):
        return ApplicationRepository.get_by_candidate_id(
            db=db,
            candidate_id=candidate_id,
        )

    @staticmethod
    def get_applied_form_ids(user_id: int, db: Session) -> list[int]:
        candidate_profile = CandidateRepository.get_by_user_id(db=db, user_id=user_id)

        if not candidate_profile:
            raise CandidateProfileNotFoundError()

        return ApplicationRepository.get_form_ids_by_candidate_id(
            db=db,
            candidate_id=candidate_profile.candidate_id,
        )

    @staticmethod
    def get_candidate_applications(
        user_id: int,
        db: Session,
    ):
        candidate_profile = CandidateRepository.get_by_user_id(
            db=db,
            user_id=user_id,
        )

        if not candidate_profile:
            logger.warning(f"Candidate profile not found. user_id={user_id}")
            raise CandidateProfileNotFoundError()

        applications = ApplicationService.get_applications_by_candidate_id(
            candidate_id=candidate_profile.candidate_id,
            db=db,
        )

        return [
            ApplicationService.get_application_with_form(
                application_id=application.application_id,
                db=db,
            )
            for application in applications
        ]

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

    @staticmethod
    def search_candidate_applications(
        user_id: int,
        db: Session,
        search: str | None,
    ):

        candidate_profile = CandidateRepository.get_by_user_id(
            db=db,
            user_id=user_id,
        )

        if not candidate_profile:

            logger.warning(f"Candidate profile not found. user_id={user_id}")

            raise CandidateProfileNotFoundError()

        applications = ApplicationRepository.search_candidate_applications(
            db=db,
            candidate_id=candidate_profile.candidate_id,
            search=search,
        )

        return [
            ApplicationService.get_application_with_form(
                application_id=application.application_id,
                db=db,
            )
            for application in applications
        ]
