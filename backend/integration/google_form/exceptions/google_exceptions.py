from fastapi import status

from exceptions.base import AppException


class GoogleClientError(AppException):
    pass


class GoogleFormsClientError(
    GoogleClientError,
):

    def __init__(self):
        super().__init__(
            message="Failed to interact with Google Forms.",
            status_code=status.HTTP_502_BAD_GATEWAY,
        )


class GoogleSheetsClientError(
    GoogleClientError,
):

    def __init__(self):
        super().__init__(
            message="Failed to interact with Google Sheets.",
            status_code=status.HTTP_502_BAD_GATEWAY,
        )


class GoogleAppsScriptClientError(
    GoogleClientError,
):

    def __init__(self):
        super().__init__(
            message="Failed to interact with Google Apps Script.",
            status_code=status.HTTP_502_BAD_GATEWAY,
        )
        
