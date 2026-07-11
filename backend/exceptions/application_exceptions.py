from fastapi import status

from exceptions.base import AppException


class ApplicationException(AppException):
    pass


class ApplicationNotFoundError(
    ApplicationException,
):

    def __init__(self):
        super().__init__(
            message="Application not found.",
            status_code=status.HTTP_404_NOT_FOUND,
        )


class ApplicationAlreadyExistsError(
    ApplicationException,
):
    def __init__(self):
        super().__init__(
            message="An application already exists for this form.",
            status_code=status.HTTP_409_CONFLICT,
        )


class CandidateProfileNotFoundError(
    ApplicationException,
):

    def __init__(self):
        super().__init__(
            message="Candidate profile not found.",
            status_code=status.HTTP_404_NOT_FOUND,
        )


class CandidateProfileAlreadyExistsError(
    ApplicationException,
):

    def __init__(self):
        super().__init__(
            message="Candidate profile already exists.",
            status_code=status.HTTP_409_CONFLICT,
        )


class ApplicationLinkNotFoundError(
    ApplicationException,
):

    def __init__(self):
        super().__init__(
            message="Application link not found.",
            status_code=status.HTTP_404_NOT_FOUND,
        )


class ApplicationAnswerNotFoundError(
    ApplicationException,
):

    def __init__(self):
        super().__init__(
            message="Application answer not found.",
            status_code=status.HTTP_404_NOT_FOUND,
        )