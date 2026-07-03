from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database.models.application import Application


class ApplicationRepository:

    @staticmethod
    def create(
        db: Session,
        application: Application,
    ) -> Application:

        try:

            db.add(application)
            db.commit()
            db.refresh(application)

            return application

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def get_by_id(
        db: Session,
        application_id: int,
    ) -> Application | None:

        return (
            db.query(Application)
            .filter(
                Application.application_id == application_id,
            )
            .first()
        )

    @staticmethod
    def get_by_form_id(
        db: Session,
        form_id: int,
    ) -> list[Application]:

        return (
            db.query(Application)
            .filter(
                Application.form_id == form_id,
            )
            .all()
        )

    @staticmethod
    def get_by_candidate_id(
        db: Session,
        candidate_id: int,
    ) -> list[Application]:

        return (
            db.query(Application)
            .filter(
                Application.candidate_id == candidate_id,
            )
            .all()
        )

    @staticmethod
    def update(
        db: Session,
        application: Application,
    ) -> Application:

        try:

            db.commit()
            db.refresh(application)

            return application

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def get_all(
        db: Session,
    ) -> list[Application]:

        return (
            db.query(Application)
            .all()
        )

    @staticmethod
    def delete(
        db: Session,
        application: Application,
    ) -> None:

        try:

            db.delete(application)
            db.commit()

        except SQLAlchemyError:

            db.rollback()
            raise
        
        
        