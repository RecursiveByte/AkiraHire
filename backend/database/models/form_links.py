from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    JSON,
)

from database.base import Base


class FormLinks(Base):
    __tablename__ = "form_links"

    form_id = Column(
        Integer,
        ForeignKey(
            "forms.form_id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )

    links_json = Column(
        JSON,
        nullable=False,
    )