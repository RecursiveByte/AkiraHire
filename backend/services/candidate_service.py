from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from database.models.candidate_profile import (
    CandidateProfile,
)

from repositories.candidate_repository import (
    CandidateRepository,
)

from repositories.application_repository import ApplicationRepository

from schemas.candidate_schema import (
    CandidateProfileCreate,
    CandidateProfileUpdate
)

from schemas.auth_schema import CurrentUser

from exceptions.application_exceptions import (
    ApplicationNotFoundError
)

from exceptions.candidate_exceptions import (
    CandidateEmailAlreadyExistsError,
    CandidateProfileAlreadyExistsError,
    CandidateProfileNotFoundError,
    UnauthorizedCandidateError,

)

from utils.logger import get_logger

logger = get_logger(__name__)


class CandidateService:

    @staticmethod

    def create_candidate_profile(
        current_user: CurrentUser,
        db: Session,
        candidate_data: CandidateProfileCreate,
    ) -> CandidateProfile:

        logger.info(
            "Candidate profile creation request received."
        )

        user_id = current_user.user_id

        logger.info(
            f"Authenticated user. user_id={user_id}"
        )

        existing_profile = (
            CandidateRepository.get_by_user_id(
                db=db,
                user_id=user_id,
            )
        )

        if existing_profile:

            logger.warning(
                f"Candidate profile already exists for user_id={user_id}."
            )

            raise CandidateProfileAlreadyExistsError()

        existing_email = (
            CandidateRepository.get_by_email(
                db=db,
                email=current_user.email,
            )
        )

        if existing_email:

            logger.warning(
                f"Duplicate email detected. email={candidate_data.email}"
            )

            raise CandidateEmailAlreadyExistsError()

        candidate_profile = CandidateProfile(
            user_id=user_id,
            full_name=candidate_data.full_name,
            email=current_user.email,
            phone=candidate_data.phone,
            resume_url=str(candidate_data.resume_url),
        )

        try:

            candidate_profile = (
                CandidateRepository.create(
                    db=db,
                    candidate_profile=candidate_profile,
                )
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
        
        
    @staticmethod
    def get_candidate_profile_by_id(
        candidate_id: int,
        db: Session,
    ) -> CandidateProfile:

        logger.info(
            f"Fetching candidate profile. candidate_id={candidate_id}"
        )

        candidate_profile = (
            CandidateRepository.get_by_id(
                db=db,
                candidate_id=candidate_id,
            )
        )

        if not candidate_profile:

            logger.warning(
                f"Candidate profile not found. candidate_id={candidate_id}"
            )

            raise CandidateProfileNotFoundError()

        logger.info(
            f"Candidate profile fetched successfully. candidate_id={candidate_id}"
        )

        return candidate_profile
    
    @staticmethod

    def update_candidate_profile(
        candidate_id: int,
        current_user: CurrentUser,
        db: Session,
        candidate_data: CandidateProfileUpdate,
    ) -> CandidateProfile:

        logger.info(
            f"Updating candidate profile. candidate_id={candidate_id}"
        )

        candidate_profile = (
            CandidateRepository.get_by_id(
                db=db,
                candidate_id=candidate_id,
            )
        )

        if not candidate_profile:

            logger.warning(
                f"Candidate profile not found. candidate_id={candidate_id}"
            )

            raise CandidateProfileNotFoundError()

        if (
            candidate_profile.user_id
            != current_user.user_id
        ):

            logger.warning(
                f"Unauthorized profile update. "
                f"candidate_id={candidate_id}, "
                f"user_id={current_user.user_id}"
            )

            raise UnauthorizedCandidateError()

        if (
            candidate_data.email is not None
            and candidate_data.email
            != candidate_profile.email
        ):

            existing_email = (
                CandidateRepository.get_by_email(
                    db=db,
                    email=candidate_data.email,
                )
            )

            if existing_email:

                logger.warning(
                    f"Duplicate email detected. "
                    f"email={candidate_data.email}"
                )

                raise CandidateEmailAlreadyExistsError()

            candidate_profile.email = (
                candidate_data.email
            )

        if candidate_data.full_name is not None:

            candidate_profile.full_name = (
                candidate_data.full_name
            )

        if candidate_data.phone is not None:

            candidate_profile.phone = (
                candidate_data.phone
            )

        if candidate_data.resume_url is not None:

            candidate_profile.resume_url = str(
                candidate_data.resume_url
            )

        try:

            candidate_profile = (
                CandidateRepository.update(
                    db=db,
                    candidate_profile=candidate_profile,
                )
            )

            logger.info(
                f"Candidate profile updated successfully. "
                f"candidate_id={candidate_id}"
            )

            return candidate_profile

        except SQLAlchemyError:

            logger.exception(
                f"Database error while updating "
                f"candidate_id={candidate_id}"
            )

            raise
        
        
    @staticmethod

    def delete_candidate_profile(
        candidate_id: int,
        current_user: CurrentUser,
        db: Session,
    ) -> None:

        logger.info(
            f"Deleting candidate profile. candidate_id={candidate_id}"
        )
        print( "this ",candidate_id)
        candidate_profile = (
            CandidateRepository.get_by_id(
                db=db,
                candidate_id=candidate_id,
            )
        )

        if not candidate_profile:

            logger.warning(
                f"Candidate profile not found. candidate_id={candidate_id}"
            )

            raise CandidateProfileNotFoundError()

        if (
            candidate_profile.user_id
            != current_user.user_id
        ):

            logger.warning(
                f"Unauthorized profile deletion. "
                f"candidate_id={candidate_id}, "
                f"user_id={current_user.user_id}"
            )

            raise UnauthorizedCandidateError()

        try:

            CandidateRepository.delete(
                db=db,
                candidate_profile=candidate_profile,
            )

            logger.info(
                f"Candidate profile deleted successfully. "
                f"candidate_id={candidate_id}"
            )
            
            return {"message": "Candidate profile deleted successfully."}

        except SQLAlchemyError:

            logger.exception(
                f"Database error while deleting "
                f"candidate_id={candidate_id}"
            )

            raise
        
    @staticmethod
    def get_candidate_profile_by_application_id(
        application_id: int,
        db: Session,
    ) -> CandidateProfile:

        logger.info(
            f"Fetching candidate profile by application. application_id={application_id}"
        )

        application = (
            ApplicationRepository.get_by_id(
                db=db,
                application_id=application_id,
            )
        )

        if not application:

            logger.warning(
                f"Application not found. application_id={application_id}"
            )

            raise ApplicationNotFoundError()

        candidate_profile = (
            CandidateRepository.get_by_id(
                db=db,
                candidate_id=application.candidate_id,
            )
        )

        if not candidate_profile:

            logger.warning(
                f"Candidate profile not found. candidate_id={application.candidate_id}"
            )

            raise CandidateProfileNotFoundError()

        logger.info(
            f"Candidate profile fetched successfully via application. "
            f"application_id={application_id}, candidate_id={application.candidate_id}"
        )

        return candidate_profile        
