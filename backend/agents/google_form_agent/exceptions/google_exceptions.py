"""
Exceptions raised by Google API clients.
"""


class GoogleClientError(Exception):
    """Base exception for all Google client errors."""
    pass


class GoogleFormsClientError(GoogleClientError):
    """Raised when a Google Forms API request fails."""
    pass


class GoogleSheetsClientError(GoogleClientError):
    """Raised when a Google Sheets API request fails."""
    pass


class GoogleAppsScriptClientError(GoogleClientError):
    """Raised when a Google Apps Script API request fails."""
    pass