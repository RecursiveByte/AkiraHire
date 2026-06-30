from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database.models.application_links import (
    ApplicationLinks,
)


class ApplicationLinksRepository:

    @staticmethod
    def create(
        db: Session,
        application_links: ApplicationLinks,
    ) -> ApplicationLinks:

        try:

            db.add(application_links)
            db.commit()
            db.refresh(application_links)

            return application_links

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def get_by_application_id(
        db: Session,
        application_id: int,
    ) -> ApplicationLinks | None:

        return (
            db.query(ApplicationLinks)
            .filter(
                ApplicationLinks.application_id == application_id,
            )
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        application_links: ApplicationLinks,
    ) -> ApplicationLinks:

        try:

            db.commit()
            db.refresh(application_links)

            return application_links

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def delete(
        db: Session,
        application_links: ApplicationLinks,
    ) -> None:

        try:

            db.delete(application_links)
            db.commit()

        except SQLAlchemyError:

            db.rollback()
            raise