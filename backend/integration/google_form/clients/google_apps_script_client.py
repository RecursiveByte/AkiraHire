"""
Google Apps Script client.

Responsible only for communicating with the Google Apps Script API.
"""

from googleapiclient.discovery import (
    build,
    Resource,
)
from googleapiclient.errors import HttpError

from integration.google_form.exceptions.google_exceptions import (
    GoogleAppsScriptClientError,
)

from integration.google_form.config.settings import settings

from utils.logger import get_logger

logger = get_logger(__name__)


def build_script_service(
    creds,
) -> Resource:

    return build(
        "script",
        "v1",
        credentials=creds,
    )


def link_form_to_sheet(
    service: Resource,
    form_id: str,
    sheet_id: str,
) -> dict:

    body = {
        "function": "linkFormToSheet",
        "parameters": [
            form_id,
            sheet_id,
        ],
    }

    try:

        response = (
            service.scripts()
            .run(
                scriptId=settings.APPS_SCRIPT_ID,
                body=body,
            )
            .execute()
        )

    except HttpError:

        logger.exception(
            "Google Apps Script API request failed."
        )

        raise GoogleAppsScriptClientError()

    if "error" in response:

        logger.error(
            f"Apps Script execution failed. "
            f"response={response}"
        )

        raise GoogleAppsScriptClientError()

    result = (
        response.get(
            "response",
            {},
        )
        .get(
            "result",
            {},
        )
    )

    if result.get("status") != "linked":

        logger.error(
            f"Failed to link Google Form to Sheet. "
            f"result={result}"
        )

        raise GoogleAppsScriptClientError()

    return result