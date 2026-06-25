"""
Exceptions related to Google OAuth.
"""


class OAuthError(Exception):
    """Base OAuth exception."""
    pass


class GoogleNotConnectedError(OAuthError):
    """Raised when the user has not connected their Google account."""
    pass


class InvalidGoogleCredentialsError(OAuthError):
    """Raised when stored Google credentials are invalid."""
    pass


class GoogleTokenRefreshError(OAuthError):
    """Raised when an access token cannot be refreshed."""
    pass