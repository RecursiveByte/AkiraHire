from uuid import UUID

from sqlalchemy.orm import Session

from database.models.chat_thread import ChatThread


class ChatThreadRepository:

    @staticmethod
    def create(db: Session, thread: ChatThread):
        db.add(thread)
        db.commit()
        db.refresh(thread)
        return thread

    @staticmethod
    def get_by_id(
        db: Session,
        thread_id: UUID,
    ) -> ChatThread | None:
        return db.query(ChatThread).filter(ChatThread.id == thread_id).first()


    @staticmethod
    def get_all_by_user_id(
        db: Session,
        user_id: int,
        search: str | None = None,
    ) -> list[ChatThread]:
    
        query = db.query(ChatThread).filter(ChatThread.user_id == user_id)
    
        if search:
            search = search.strip()
            query = query.filter(ChatThread.title.ilike(f"%{search}%"))
    
        return query.order_by(ChatThread.updated_at.desc()).all()

    @staticmethod
    def delete(
        db: Session,
        thread: ChatThread,
    ) -> None:
        db.delete(thread)
        db.commit()
