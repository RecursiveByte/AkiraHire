from sqlalchemy.orm import Session

from database.models.chat_message import ChatMessage

from schemas.chat_schema import (
    ChatHistoryResponse,
    ChatMessageResponse,
)

from repositories.chat_message_repository import ChatMessageRepository

class ChatMessageService:

    @staticmethod
    def save_message(
        db: Session,
        thread_id: str,
        role: str,
        content: str,
    ) -> ChatMessage:

        message = ChatMessage(
            thread_id=thread_id,
            role=role,
            content=content,
        )

        db.add(message)
        db.commit()
        db.refresh(message)

        return message
    
    @staticmethod
    def get_chat_history(
        db: Session,
        thread_id: str,
    ) -> ChatHistoryResponse:

        messages = ChatMessageRepository.get_messages_by_thread_id(
            db=db,
            thread_id=thread_id,
        )

        return ChatHistoryResponse(
            messages=[
                ChatMessageResponse(
                    role=message.role,
                    content=message.content,
                )
                for message in messages
            ]
        )