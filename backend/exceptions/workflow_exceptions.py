from exceptions.base import AppException


class GraphNotFoundError(AppException):
    def __init__(self, workflow_name: str):
        super().__init__(f"Workflow '{workflow_name}' not found in registry", status_code=404)