from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    JSON,
)

from database.base import Base


class ApplicationLinks(Base):
    __tablename__ = "application_links"

    application_id = Column(
        Integer,
        ForeignKey(
            "applications.application_id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )

    links_json = Column(
        JSON,
        nullable=False,
    )