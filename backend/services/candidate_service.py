from fastapi import Request

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from auth.auth_utils import get_user_id_from_request

from config.logging import logger

from database.models.candidate_profile import CandidateProfile

from repositories.candidate_repository import CandidateRepository

from schemas.candidate_schema import CandidateProfileCreate

from exceptions.candidate_exceptions import (
    CandidateEmailAlreadyExistsError,
    CandidateProfileAlreadyExistsError,
)


class CandidateService:

    @staticmethod
    def create_candidate_profile(
        request: Request,
        db: Session,
        candidate_data: CandidateProfileCreate,
    ) -> CandidateProfile:

        logger.info("Candidate profile creation request received.")

        user_id = get_user_id_from_request(request)

        logger.info(f"Authenticated user. user_id={user_id}")

        existing_profile = CandidateRepository.get_by_user_id(
            db=db,
            user_id=user_id,
        )

        if existing_profile:

            logger.warning(
                f"Candidate profile already exists for user_id={user_id}."
            )

            raise CandidateProfileAlreadyExistsError()

        existing_email = CandidateRepository.get_by_email(
            db=db,
            email=candidate_data.email,
        )

        if existing_email:

            logger.warning(
                f"Duplicate email detected. email={candidate_data.email}"
            )

            raise CandidateEmailAlreadyExistsError()

        candidate_profile = CandidateProfile(
            user_id=user_id,
            full_name=candidate_data.full_name,
            email=candidate_data.email,
            phone=candidate_data.phone,
            resume_url=candidate_data.resume_url,
        )

        try:

            candidate_profile = CandidateRepository.create(
                db=db,
                candidate_profile=candidate_profile,
            )

            logger.info(
                f"Candidate profile created successfully. "
                f"candidate_id={candidate_profile.candidate_id}, "
                f"user_id={user_id}"
            )

            return candidate_profile

        except SQLAlchemyError:

            logger.exception(
                f"Database error while creating candidate profile. "
                f"user_id={user_id}"
            )

            raise