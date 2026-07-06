from sqlalchemy.orm import Session

from database.models.chat_message import ChatMessage


class ChatMessageRepository:

    @staticmethod
    def get_messages_by_thread_id(
        db: Session,
        thread_id: str,
    ) -> list[ChatMessage]:
        return (
            db.query(ChatMessage)
            .filter(ChatMessage.thread_id == thread_id)
            .order_by(ChatMessage.created_at.asc())
            .all()
        )