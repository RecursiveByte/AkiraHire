from sqlalchemy.orm import Session

from database.models.user import User
from enums.user_role_enum import UserRole
from sqlalchemy.exc import SQLAlchemyError


class RecruiterRepository:

    @staticmethod
    def get_all(db: Session) -> list[User]:
        return (
            db.query(User)
            .filter(User.role == UserRole.RECRUITER)
            .order_by(User.created_at.desc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        recruiter_id: int,
    ) -> User | None:
        return (
            db.query(User)
            .filter(
                User.id == recruiter_id,
                User.role == UserRole.RECRUITER,
            )
            .first()
        )

    @staticmethod
    def delete(
        db: Session,
        recruiter: User,
    ) -> None:
        try:
            db.delete(recruiter)
            db.commit()
        except SQLAlchemyError:
            db.rollback()
            raise