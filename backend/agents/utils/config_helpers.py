from langchain_core.runnables import RunnableConfig

from exceptions.base import AppException

from sqlalchemy.orm import Session



def get_current_user(config: RunnableConfig):

    current_user = config.get("configurable", {}).get("current_user")

    if not current_user:
        raise AppException("Missing recruiter context", status_code=500)

    return current_user


def get_db_session(config: RunnableConfig) -> Session:

    db = config.get("configurable", {}).get("db")

    if db is None:
        raise AppException(
            "Missing database session",
            status_code=500,
        )

    return db