from fastapi import status

from exceptions.base import AppException


class ResumeException(AppException):
    pass


class ResumeDownloadError(
    ResumeException,
):

    def __init__(self):
        super().__init__(
            message="Failed to download the resume.",
            status_code=status.HTTP_502_BAD_GATEWAY,
        )


class UnsupportedResumeFormatError(
    ResumeException,
):

    def __init__(self):
        super().__init__(
            message="Unsupported resume format.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class ResumeParsingError(
    ResumeException,
):

    def __init__(self):
        super().__init__(
            message="Failed to parse the resume.",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )