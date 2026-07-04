from sqlalchemy.orm import Session

from database.models.chat_session import ChatSession


class ChatSessionRepository:

    @staticmethod
    def get_active_agent(db: Session, thread_id: str) -> str | None:
        session = db.get(ChatSession, thread_id)
        if session is None:
            return None
        return session.active_agent

    @staticmethod
    def set_active_agent(db: Session, thread_id: str, agent: str | None) -> None:
        session = db.get(ChatSession, thread_id)
        if session is None:
            session = ChatSession(thread_id=thread_id, active_agent=agent)
            db.add(session)
        else:
            session.active_agent = agent
        db.commit()