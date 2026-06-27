from uuid import UUID

from sqlalchemy.orm import Session

from database.models.linkedin_post_draft import LinkedInPostDraft


def create_draft(
    db: Session,
    user_id: int,
    post_text: str,
) -> LinkedInPostDraft:
    draft = LinkedInPostDraft(
        user_id=user_id,
        post_text=post_text,
    )

    db.add(draft)
    db.commit()
    db.refresh(draft)

    return draft


def get_draft(
    db: Session,
    draft_id: UUID,
    user_id: int,
) -> LinkedInPostDraft | None:
    return (
        db.query(LinkedInPostDraft)
        .filter(
            LinkedInPostDraft.id == draft_id,
            LinkedInPostDraft.user_id == user_id,
        )
        .first()
    )


def delete_draft(
    db: Session,
    draft: LinkedInPostDraft,
) -> None:
    db.delete(draft)
    db.commit()