from fastapi import status
from exceptions.base import AppException


class JobException(AppException):
    pass


class JobNotFoundError(JobException):

    def __init__(self):
        super().__init__(
            message="Job not found.",
            status_code=status.HTTP_404_NOT_FOUND,
        )


class JobExpiredError(JobException):

    def __init__(self):
        super().__init__(
            message="Job expiration date must be in the future.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class UnauthorizedRecruiterError(JobException):

    def __init__(self):
        super().__init__(
            message="You are not authorized to perform this action.",
            status_code=status.HTTP_403_FORBIDDEN,
        )


class JobAlreadyExistsError(JobException):

    def __init__(self):
        super().__init__(
            message="A job with this title already exists for this recruiter.",
            status_code=status.HTTP_409_CONFLICT,
        )


class JobAlreadyClosedError(JobException):

    def __init__(self):
        super().__init__(
            message="This job is already closed.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class JobClosedError(JobException):

    def __init__(self):
        super().__init__(
            message="This job is closed and no longer accepting applications.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class JobDraftError(JobException):

    def __init__(self):
        super().__init__(
            message="This job is still in draft and cannot be published.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class InvalidJobStatusTransitionError(JobException):

    def __init__(self):
        super().__init__(
            message="Invalid job status transition.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class JobFormNotFoundError(JobException):

    def __init__(self):
        super().__init__(
            message="No application form is associated with this job.",
            status_code=status.HTTP_404_NOT_FOUND,
        )