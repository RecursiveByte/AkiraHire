from uuid import UUID

from sqlalchemy.orm import Session

from database.models.chat_thread import ChatThread
from repositories.chat_thread_repository import ChatThreadRepository
from schemas.auth_schema import CurrentUser

from prompts.thread_title_prompt import THREAD_TITLE_PROMPT
from core.llm.llm_client import safe_invoke, get_llm

from langchain_core.prompts import ChatPromptTemplate

from exceptions.chat_thread_exception import ChatThreadNotFoundError

THREAD_TITLE_CHAT_PROMPT = ChatPromptTemplate.from_messages(
    [
        ("system", THREAD_TITLE_PROMPT),
        ("human", "{message}"),
    ]
)


class ChatThreadService:

    @staticmethod
    def create_thread(
        db: Session,
        current_user: CurrentUser,
        thread_id: UUID,
        title: str,
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
    def generate_thread_title(message: str) -> str:

        llm = get_llm()

        messages = THREAD_TITLE_CHAT_PROMPT.format_messages(message=message)

        response = safe_invoke(llm, messages)

        title = response.content.strip()
        print(" created title ", title)

        return title if title else "New Chat"

    @staticmethod
    def get_all_threads(
        db: Session,
        current_user: CurrentUser,
    ):
        return ChatThreadRepository.get_all_by_user_id(
            db=db,
            user_id=current_user.user_id,
        )

    @staticmethod
    def delete_thread(
        db,
        thread_id: UUID,
        user_id: int,
    ) -> dict[str, str]:
        thread = ChatThreadRepository.get_by_id(
            db=db,
            thread_id=thread_id,
        )

        if thread is None or thread.user_id != user_id:
            raise ChatThreadNotFoundError()

        ChatThreadRepository.delete(
            db=db,
            thread=thread,
        )

        return {
            "message": "Conversation deleted successfully."
        }