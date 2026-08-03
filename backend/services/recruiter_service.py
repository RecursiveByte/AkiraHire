from sqlalchemy.orm import Session

from auth.dependencies.dependencies import CurrentUser
from enums.user_role_enum import UserRole

from repositories.recruiter_repository import RecruiterRepository

from exceptions.auth_exceptions import UnauthorizedError
from exceptions.recruiter_exception import RecruiterNotFoundError

from utils.logger import get_logger

logger = get_logger(__name__)


class RecruiterService:

    @staticmethod
    def get_all_recruiters(
        db: Session,
    ):
        logger.info("Fetching all recruiters.")

        return RecruiterRepository.get_all(db)

    @staticmethod
    def delete_recruiter(
        recruiter_id: int,
        current_user: CurrentUser,
        db: Session,
    ):
        logger.info(
            "Deleting recruiter. recruiter_id=%s requested_by=%s",
            recruiter_id,
            current_user.user_id,
        )

        recruiter = RecruiterRepository.get_by_id(
            db=db,
            recruiter_id=recruiter_id,
        )

        if recruiter is None:
            raise RecruiterNotFoundError()

        if current_user.role != UserRole.ADMIN:
            raise UnauthorizedError()

        RecruiterRepository.delete(
            db=db,
            recruiter=recruiter,
        )

        logger.info(
            "Recruiter deleted successfully. recruiter_id=%s",
            recruiter_id,
        )

        return {
            "message": "Recruiter deleted successfully."
        }