from exceptions.base import AppException


class RecruiterNotFoundError(AppException):
    def __init__(self):
        super().__init__(
            status_code=404,
            message="Recruiter not found.",
        )


class UnauthorizedRecruiterError(AppException):
    def __init__(self):
        super().__init__(
            status_code=403,
            message="You are not authorized to perform this action.",
        )