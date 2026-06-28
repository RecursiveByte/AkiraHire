from fastapi import status


class JobException(Exception):

    def __init__(
        self,
        message: str,
        status_code: int,
    ):
        self.message = message
        self.status_code = status_code
        super().__init__(message)



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