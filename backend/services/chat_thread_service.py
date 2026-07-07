from uuid import UUID

from sqlalchemy.orm import Session

from database.models.chat_thread import ChatThread
from repositories.chat_thread_repository import ChatThreadRepository
from schemas.auth_schema import CurrentUser


class ChatThreadService:

    @staticmethod
    def create_thread(
        db: Session,
        current_user: CurrentUser,
        thread_id: UUID,
        title:str,
    ) -> ChatThread:
        thread = ChatThread(
            id=thread_id,
            user_id=current_user.user_id,
            title=title,
        )

        return ChatThreadRepository.create(
            db=db,
            thread=thread,
        )
        
    @staticmethod
    def get_all_threads(
        db: Session,
        current_user: CurrentUser,
    ):
        return ChatThreadRepository.get_all_by_user_id(
            db=db,
            user_id=current_user.user_id,
        )