"""
Google Sheets client.

Responsible only for communicating with the Google Sheets API.
"""

from googleapiclient.discovery import (
    build,
    Resource,
)
from googleapiclient.errors import (
    HttpError,
)

from integration.google_form.exceptions.google_exceptions import (
    GoogleSheetsClientError,
)

from utils.logger import get_logger

logger = get_logger(__name__)


def build_sheets_service(
    creds,
) -> Resource:

    return build(
        "sheets",
        "v4",
        credentials=creds,
    )


def create_response_sheet(
    service: Resource,
    title: str,
) -> str:

    body = {
        "properties": {
            "title": f"{title} - Responses",
        }
    }

    try:

        response = (
            service.spreadsheets()
            .create(
                body=body,
                fields="spreadsheetId",
            )
            .execute()
        )

        return response["spreadsheetId"]

    except HttpError:

        logger.exception(
            "Google Sheets API request failed."
        )

        raise GoogleSheetsClientError()


def sheet_url(
    sheet_id: str,
) -> str:

    return (
        f"https://docs.google.com/spreadsheets/d/"
        f"{sheet_id}/edit"
    )