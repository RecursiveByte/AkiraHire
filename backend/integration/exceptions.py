from exceptions.base import AppException


class ConnectedAccountNotFoundException(AppException):
    def __init__(self, account_id: int):
        super().__init__(
            status_code=404,
            detail=f"Connected account {account_id} not found",
        )