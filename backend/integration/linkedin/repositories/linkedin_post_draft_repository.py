from uuid import UUID

from sqlalchemy.orm import Session

from database.models.linkedin_post_draft import LinkedInPostDraft


class LinkedInPostDraftRepository:

    @staticmethod
    def create_draft(
        db: Session,
        user_id: int,
        post_text: str,
        title: str,
    ) -> LinkedInPostDraft:
        draft = LinkedInPostDraft(
            user_id=user_id,
            title=title,
            post_text=post_text,
        )

        db.add(draft)
        db.commit()
        db.refresh(draft)

        return draft

    @staticmethod
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

    @staticmethod
    def list_drafts(
        db: Session,
        user_id: int,
        search: str | None = None,
    ) -> list[LinkedInPostDraft]:
        query = db.query(LinkedInPostDraft).filter(
            LinkedInPostDraft.user_id == user_id,
        )

        if search:
            query = query.filter(
                LinkedInPostDraft.title.ilike(f"%{search}%"),
            )

        return query.order_by(LinkedInPostDraft.created_at.desc()).all()

    @staticmethod
    def delete_draft(
        db: Session,
        draft: LinkedInPostDraft,
    ) -> None:
        db.delete(draft)
        db.commit()