from sqlalchemy.orm import Session

from database.models.application_links import (
    ApplicationLinks,
)

from repositories.application_link_repository import (
    ApplicationLinksRepository,
)

from schemas.application_schema import (
    ApplicationLinkRequest,
)

from utils.logger import get_logger

logger = get_logger(__name__)


class ApplicationLinksService:

    @staticmethod
    def create_links(
        application_id: int,
        payload: list[ApplicationLinkRequest],
        db: Session,
    ) -> ApplicationLinks:

        logger.info(
            f"Creating application links for application_id={application_id}."
        )

        application_links = ApplicationLinks(
            application_id=application_id,
            links_json=[
                link.model_dump()
                for link in payload
            ],
        )

        created_links = (
            ApplicationLinksRepository.create(
                db=db,
                application_links=application_links,
            )
        )

        logger.info(
            f"Application links created successfully for application_id={application_id}."
        )

        return created_links