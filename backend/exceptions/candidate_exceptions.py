from fastapi import status


class CandidateException(Exception):

    def __init__(
        self,
        message: str,
        status_code: int,
    ):
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class CandidateProfileAlreadyExistsError(CandidateException):

    def __init__(self):
        super().__init__(
            message="Candidate profile already exists for this user.",
            status_code=status.HTTP_409_CONFLICT,
        )


class CandidateEmailAlreadyExistsError(CandidateException):

    def __init__(self):
        super().__init__(
            message="Candidate profile with this email already exists.",
            status_code=status.HTTP_409_CONFLICT,
        )


class CandidateProfileNotFoundError(CandidateException):

    def __init__(self):
        super().__init__(
            message="Candidate profile not found.",
            status_code=status.HTTP_404_NOT_FOUND,
        )