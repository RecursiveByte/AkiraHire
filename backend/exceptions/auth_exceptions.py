from fastapi import status
from exceptions.base import AppException

class AuthException(AppException):
    pass

class UserAlreadyExistsError(AuthException):

    def __init__(self):
        super().__init__(
            message="User already exists.",
            status_code=status.HTTP_409_CONFLICT,
        )


class InvalidCredentialsError(AuthException):

    def __init__(self):
        super().__init__(
            message="Invalid email or password.",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )


class UnauthorizedError(AuthException):

    def __init__(self):
        super().__init__(
            message="Authentication required.",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )


class NoActiveSessionError(AuthException):

    def __init__(self):
        super().__init__(
            message="No active session found.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class GoogleAuthenticationError(AuthException):

    def __init__(self):
        super().__init__(
            message="Google authentication failed.",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
        
        
class TokenExpiredError(AuthException):

    def __init__(self):
        super().__init__(
            message="Token has expired.",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )


class InvalidTokenError(AuthException):

    def __init__(self):
        super().__init__(
            message="Invalid token.",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )