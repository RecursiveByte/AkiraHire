from fastapi import status

from exceptions.base import AppException


class ApplicationEvaluationError(
    AppException,
):
    pass


class ApplicationEvaluationNotFoundError(
    ApplicationEvaluationError,
):

    def __init__(self):
        super().__init__(
            message="Application evaluation not found.",
            status_code=status.HTTP_404_NOT_FOUND,
        )


class ApplicationAlreadyEvaluatedError(
    ApplicationEvaluationError,
):

    def __init__(self):
        super().__init__(
            message="Application has already been evaluated.",
            status_code=status.HTTP_409_CONFLICT,
        )


class ApplicationEvaluationFailedError(
    ApplicationEvaluationError,
):

    def __init__(self):
        super().__init__(
            message="Failed to evaluate the application.",
            status_code=status.HTTP_502_BAD_GATEWAY,
        )