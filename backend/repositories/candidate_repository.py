from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from database.models.candidate_profile import CandidateProfile


class CandidateRepository:

    @staticmethod
    def get_by_email(
        db: Session,
        email: str,
    ) -> CandidateProfile | None:

        return (
            db.query(CandidateProfile)
            .filter(CandidateProfile.email == email)
            .first()
        )


    @staticmethod
    def get_by_user_id(
        db: Session,
        user_id: int,
    ) -> CandidateProfile | None:

        return (
            db.query(CandidateProfile)
            .filter(CandidateProfile.user_id == user_id)
            .first()
        )

    @staticmethod

    def get_by_id(
        db: Session,
        candidate_id: int,
    ) -> CandidateProfile | None:

        return (
            db.query(CandidateProfile)
            .filter(
                CandidateProfile.candidate_id == candidate_id,
            )
            .first()
        )


    @staticmethod
    def create(
        db: Session,
        candidate_profile: CandidateProfile,
    ) -> CandidateProfile:

        try:

            db.add(candidate_profile)
            db.commit()
            db.refresh(candidate_profile)

            return candidate_profile

        except SQLAlchemyError:

            db.rollback()
            raise
        
    @staticmethod

    def update(
        db: Session,
        candidate_profile: CandidateProfile,
    ) -> CandidateProfile:

        try:

            db.commit()
            db.refresh(candidate_profile)

            return candidate_profile

        except SQLAlchemyError:

            db.rollback()
            raise


    @staticmethod

    def delete(
        db: Session,
        candidate_profile: CandidateProfile,
    ) -> None:

        try:

            db.delete(candidate_profile)
            db.commit()

        except SQLAlchemyError:

            db.rollback()
            raise