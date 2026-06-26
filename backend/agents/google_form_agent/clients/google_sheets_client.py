"""
Google Sheets client.

Responsible only for communicating with the Google Sheets API.
"""

import logging

from googleapiclient.discovery import build, Resource
from googleapiclient.errors import HttpError

from agents.google_form_agent.exceptions.google_exceptions import (
    GoogleSheetsClientError,
)

logger = logging.getLogger(__name__)


def build_sheets_service(creds) -> Resource:
    """Build and return the Google Sheets service."""
    return build(
        "sheets",
        "v4",
        credentials=creds,
    )


def create_response_sheet(
    service: Resource,
    title: str,
) -> str:
    """
    Create a response spreadsheet.

    Returns:
        Spreadsheet ID.
    """

    body = {
        "properties": {
            "title": f"{title} - Responses"
        }
    }

    try:

        response = service.spreadsheets().create(
            body=body,
            fields="spreadsheetId",
        ).execute()

        return response["spreadsheetId"]

    except HttpError as e:

        logger.exception(
            "Google Sheets API failed while creating spreadsheet."
        )

        raise GoogleSheetsClientError(
            "Failed to create Google response spreadsheet."
        ) from e


def sheet_url(sheet_id: str) -> str:
    """Return the spreadsheet URL."""

    return (
        f"https://docs.google.com/spreadsheets/d/"
        f"{sheet_id}/edit"
    )