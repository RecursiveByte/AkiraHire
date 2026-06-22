"""
Handles Google Sheets API operations: creating a response sheet.
Does NOT handle auth, forms, or linking — only Sheets.
"""

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


def build_sheets_service(creds):
    return build("sheets", "v4", credentials=creds)


def create_response_sheet(service, title: str) -> str:
    """Creates a new Sheet under the authenticated user's account. Returns spreadsheetId."""
    spreadsheet_body = {"properties": {"title": f"{title} - Responses"}}
    try:
        result = service.spreadsheets().create(
            body=spreadsheet_body, fields="spreadsheetId"
        ).execute()
        return result["spreadsheetId"]
    except HttpError as e:
        raise RuntimeError(f"Failed to create response sheet: {e}")


def sheet_url(sheet_id: str) -> str:
    return f"https://docs.google.com/spreadsheets/d/{sheet_id}/edit"