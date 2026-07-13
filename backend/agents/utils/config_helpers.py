from langchain_core.runnables import RunnableConfig

from exceptions.base import AppException


def get_current_user(config: RunnableConfig):

    current_user = config.get("configurable", {}).get("current_user")

    if not current_user:
        raise AppException("Missing recruiter context", status_code=500)

    return current_user