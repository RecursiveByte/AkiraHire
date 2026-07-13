from sqlalchemy.orm import Session

from database.models.form import Form

from repositories.job_repository import JobRepository
from repositories.form_repository import FormRepository

from exceptions.form_exceptions import (
    FormNotFoundError,
    FormAlreadyClosedError,
    FormCannotBeClosedError,
    FormAlreadyExistsError,
    FormAlreadyPublishedError,
    InvalidExpiryDateError,
)

from exceptions.job_exceptions import JobNotFoundError, JobNotPublishedError


from schemas.form_schema import (
    CreateFormRequest,
    CreateFormResponse,
    GetFormResponse,
    PublishFormResponse,
    CloseFormResponse,
    DeleteFormResponse,
    GetFormWithJobResponse,
)

from enums.job_status_enum import JobStatus
from enums.form_status_enum import FormStatus

from utils.logger import get_logger

from datetime import datetime, timezone

logger = get_logger(__name__)


class FormService:

    @staticmethod
    def create_form(
        payload: CreateFormRequest,
        recruiter_id: int,
        db: Session,
    ) -> CreateFormResponse:
        logger.info(
            f"Creating form for job_id={payload.job_id}, recruiter_id={recruiter_id}."
        )

        expires_at = payload.expires_at

        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if expires_at <= datetime.now(timezone.utc):
            raise InvalidExpiryDateError()

        job = JobRepository.get_owned_job(
            db=db,
            job_id=payload.job_id,
            recruiter_id=recruiter_id,
        )

        if not job:
            logger.warning(
                f"Job not found for recruiter. job_id={payload.job_id}, recruiter_id={recruiter_id}"
            )
            raise JobNotFoundError()

        if job.status != JobStatus.OPEN:
            logger.warning(
                f"Cannot create form for unpublished job. job_id={payload.job_id}, status={job.status}"
            )
            raise JobNotPublishedError()

        existing_form = FormRepository.get_by_job_id(
            db=db,
            job_id=payload.job_id,
        )

        if existing_form:
            logger.warning(f"Form already exists for job_id={payload.job_id}.")
            raise FormAlreadyExistsError()

        form = Form(
            job_id=payload.job_id,
            title=payload.form_schema_json.title,
            status=FormStatus.DRAFT,
            form_schema_json=payload.form_schema_json.model_dump(),
            expires_at=payload.expires_at,
        )

        created_form = FormRepository.create(
            db=db,
            form=form,
        )

        logger.info(f"Form created successfully. form_id={created_form.form_id}")

        return CreateFormResponse(
            form_id=created_form.form_id,
            job_id=created_form.job_id,
            title=created_form.title,
            status=created_form.status,
            form_schema_json=payload.form_schema_json,
            expires_at=created_form.expires_at,
            created_at=created_form.created_at,
            updated_at=created_form.updated_at,
        )


    @staticmethod
    def get_forms_by_recruiter_id(
        db: Session,
        recruiter_id: int,
        search: str | None = None,
    ) -> list[Form]:
        return FormRepository.get_forms_by_recruiter_id(
            db=db,
            recruiter_id=recruiter_id,
            search=search,
        )
        
    @staticmethod
    def get_form_by_job_id(
        job_id: int,
        db: Session,
    ) -> GetFormResponse:

        logger.info(f"Fetching form for job_id={job_id}.")

        form = FormRepository.get_by_job_id(
            db=db,
            job_id=job_id,
        )

        if not form:

            logger.warning(f"Form not found for job_id={job_id}.")

            raise FormNotFoundError()

        logger.info(f"Form retrieved successfully. form_id={form.form_id}")

        return GetFormResponse(
            form_id=form.form_id,
            job_id=form.job_id,
            title=form.title,
            status=form.status,
            form_schema_json=form.form_schema_json,
            expires_at=form.expires_at,
            created_at=form.created_at,
            updated_at=form.updated_at,
        )

    @staticmethod
    def publish_form(
        form_id: int,
        db: Session,
    ) -> PublishFormResponse:

        logger.info(f"Publishing form_id={form_id}.")

        form = FormRepository.get_by_id(
            db=db,
            form_id=form_id,
        )

        if not form:

            logger.warning(f"Form not found. form_id={form_id}")

        if form.status == FormStatus.OPEN:
            logger.warning(f"Form already open . form_id={form_id}")

            raise FormAlreadyPublishedError()

        form.status = FormStatus.OPEN

        updated_form = FormRepository.update(
            db=db,
            form=form,
        )

        logger.info(f"Form published successfully. form_id={updated_form.form_id}")

        return PublishFormResponse(
            form_id=updated_form.form_id,
            status=updated_form.status,
        )

    @staticmethod
    def close_form(
        form_id: int,
        db: Session,
    ) -> CloseFormResponse:

        logger.info(f"Closing form_id={form_id}.")

        form = FormRepository.get_by_id(
            db=db,
            form_id=form_id,
        )

        if not form:

            logger.warning(f"Form not found. form_id={form_id}")

            raise FormNotFoundError()

        if form.status == FormStatus.CLOSED:

            logger.warning(f"Form is already closed. form_id={form_id}")

            raise FormAlreadyClosedError()

        if form.status != FormStatus.OPEN:

            logger.warning(f"Only open forms can be closed. form_id={form_id}")

            raise FormCannotBeClosedError()

        form.status = FormStatus.CLOSED

        updated_form = FormRepository.update(
            db=db,
            form=form,
        )

        logger.info(f"Form closed successfully. form_id={updated_form.form_id}")

        return CloseFormResponse(
            form_id=updated_form.form_id,
            status=updated_form.status,
        )

    @staticmethod
    def get_form_by_id(
        form_id: int,
        db: Session,
    ) -> GetFormResponse:

        logger.info(f"Fetching form_id={form_id}.")

        form = FormRepository.get_by_id(
            db=db,
            form_id=form_id,
        )

        if not form:

            logger.warning(f"Form not found. form_id={form_id}")

            raise FormNotFoundError()

        logger.info(f"Form retrieved successfully. form_id={form.form_id}")

        return GetFormResponse(
            form_id=form.form_id,
            job_id=form.job_id,
            title=form.title,
            status=form.status,
            form_schema_json=form.form_schema_json,
            expires_at=form.expires_at,
            created_at=form.created_at,
            updated_at=form.updated_at,
        )

    @staticmethod
    def delete_form(
        form_id: int,
        db: Session,
    ) -> DeleteFormResponse:

        logger.info(f"Deleting form_id={form_id}.")

        form = FormRepository.get_by_id(
            db=db,
            form_id=form_id,
        )

        if not form:

            logger.warning(f"Form not found. form_id={form_id}")

            raise FormNotFoundError()

        FormRepository.delete(
            db=db,
            form=form,
        )

        logger.info(f"Form deleted successfully. form_id={form_id}")

        return DeleteFormResponse(message="Form deleted successfully.")

    @staticmethod
    def get_forms_with_job(
        db: Session,
        search: str | None = None,
    ):

        results = FormRepository.get_forms_with_job(
            db=db,
            search=search,
        )

        response = []

        for form, job in results:

            response.append(
                GetFormWithJobResponse(
                    form_id=form.form_id,
                    job_id=job.job_id,
                    job_role=job.role,
                    job_description=job.job_description,
                    title=form.title,
                    status=form.status,
                    form_schema_json=form.form_schema_json,
                    expires_at=form.expires_at,
                    created_at=form.created_at,
                    updated_at=form.updated_at,
                )
            )

        return response
