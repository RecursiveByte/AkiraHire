from fastapi import status

from exceptions.base import AppException


class CandidateException(AppException):
    pass


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
        
        
class CandidateProfileNotFoundError(
    CandidateException,
):

    def __init__(self):
        super().__init__(
            message="Candidate profile not found.",
            status_code=status.HTTP_404_NOT_FOUND,
        )
        
class UnauthorizedCandidateError(
    CandidateException,
):

    def __init__(self):
        super().__init__(
            message="You are not authorized to access this candidate profile.",
            status_code=status.HTTP_403_FORBIDDEN,
        )


class InvalidCandidateDataError(CandidateException):

    def __init__(self):
        super().__init__(
            message="candidate_data is not valid JSON.",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )