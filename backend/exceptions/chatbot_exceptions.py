from exceptions.base import AppException


class UnknownAgentError(AppException):
    def __init__(self, agent_value: str) -> None:
        super().__init__(
            message=f"No graph is registered for agent '{agent_value}'.",
            status_code=400,
        )