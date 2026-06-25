"""
Google Apps Script client.

Responsible only for communicating with the Google Apps Script API.
"""

import logging

from googleapiclient.discovery import build, Resource
from googleapiclient.errors import HttpError

from agents.google_form_agent.config.settings import APPS_SCRIPT_ID
from agents.google_form_agent.exceptions.google_exceptions import (
    GoogleAppsScriptClientError,
)

logger = logging.getLogger(__name__)


def build_script_service(creds) -> Resource:
    """Build and return the Google Apps Script service."""
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
    """
    Link a Google Form to a Google Sheet by invoking the deployed
    Google Apps Script.
    """

    body = {
        "function": "linkFormToSheet",
        "parameters": [
            form_id,
            sheet_id,
        ],
    }

    try:

        response = service.scripts().run(
            scriptId=APPS_SCRIPT_ID,
            body=body,
        ).execute()

    except HttpError as e:

        logger.exception(
            "Google Apps Script API request failed."
        )

        raise GoogleAppsScriptClientError(
            "Failed to execute Apps Script."
        ) from e

    if "error" in response:

        details = response["error"].get(
            "details",
            [{}],
        )[0]

        raise GoogleAppsScriptClientError(
            details.get(
                "errorMessage",
                "Unknown Apps Script error.",
            )
        )

    result = response.get(
        "response",
        {},
    ).get(
        "result",
        {},
    )

    if result.get("status") != "linked":

        raise GoogleAppsScriptClientError(
            result.get(
                "message",
                "Failed to link form to sheet.",
            )
        )

    return result