"""
Service for linking a Google Form to a Google Sheet using a deployed
Google Apps Script.
"""

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import os


APPS_SCRIPT_ID = os.getenv("APPS_SCRIPT_ID")

def link_form_to_sheet(creds, form_id: str, sheet_id: str) -> dict:
    """Calls the deployed Apps Script function `linkFormToSheet(formId, sheetId)`."""
    script_service = build("script", "v1", credentials=creds)

    request_body = {
        "function": "linkFormToSheet",
        "parameters": [form_id, sheet_id],
    }

    try:
        response = script_service.scripts().run(
            scriptId=APPS_SCRIPT_ID, body=request_body
        ).execute()
    except HttpError as e:
        raise RuntimeError(f"Failed to call Apps Script API: {e}")

    if "error" in response:
        details = response["error"].get("details", [{}])[0]
        raise RuntimeError(
            f"Apps Script error: {details.get('errorMessage', 'Unknown error')}"
        )

    result = response.get("response", {}).get("result", {})
    print(result)

    if result.get("status") != "linked":
        raise RuntimeError(f"Linking failed: {result.get('message', 'Unknown error')}")

    return result