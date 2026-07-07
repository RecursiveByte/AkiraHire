from uuid import UUID

from sqlalchemy.orm import Session

from database.models.chat_thread import ChatThread

class ChatThreadRepository:

    @staticmethod
    def create(db:Session, thread:ChatThread):
        db.add(thread)
        db.commit()
        db.refresh(thread)
        return thread
    
    @staticmethod
    def get_by_id(
        db: Session,
        thread_id: UUID,
    ) -> ChatThread | None:
        return (
            db.query(ChatThread)
            .filter(ChatThread.id == thread_id)
            .first()
        )

    @staticmethod
    def get_all_by_user_id(
        db: Session,
        user_id: int,
    ) -> list[ChatThread]:
        return (
            db.query(ChatThread)
            .filter(ChatThread.user_id == user_id)
            .order_by(ChatThread.updated_at.desc())
            .all()
        )