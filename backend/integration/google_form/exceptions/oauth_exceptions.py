from fastapi import status

from exceptions.base import AppException


class OAuthError(AppException):
    pass


class GoogleNotConnectedError(
    OAuthError,
):

    def __init__(self):
        super().__init__(
            message="Google account is not connected.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class InvalidGoogleCredentialsError(
    OAuthError,
):

    def __init__(self):
        super().__init__(
            message="Google credentials are invalid or have expired.",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )


class GoogleTokenRefreshError(
    OAuthError,
):

    def __init__(self):
        super().__init__(
            message="Failed to refresh Google access token.",
            status_code=status.HTTP_502_BAD_GATEWAY,
        )
        
class GoogleOAuthSessionExpiredError(OAuthError):

    def __init__(self):
        super().__init__(
            message="OAuth session expired.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )