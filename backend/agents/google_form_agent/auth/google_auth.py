# auth/google_auth.py
"""
Handles Google OAuth credential creation, loading, and refreshing.
This file does ONE thing: produce a valid `Credentials` object.

Client ID and Client Secret are read from environment variables
(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET), loaded from .env via load_dotenv().
"""

import json
import os
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials


SCOPES = [
    "https://www.googleapis.com/auth/forms.body",
    "https://www.googleapis.com/auth/forms",
    "https://www.googleapis.com/auth/spreadsheets",
]

TOKEN_FILE = "token.json"

CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")

CLIENT_CONFIG = {
    "installed": {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": ["http://localhost"],
    }
}


def get_credentials() -> Credentials:
    """Loads existing credentials, refreshes if expired, or runs the OAuth flow."""
    if not CLIENT_ID or not CLIENT_SECRET:
        raise EnvironmentError(
            "GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in your .env file."
        )

    creds = None
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r") as f:
            creds = Credentials.from_authorized_user_info(json.load(f), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_config(CLIENT_CONFIG, SCOPES)
            creds = flow.run_local_server(
                port=8080, access_type="offline", prompt="consent"
            )

        with open(TOKEN_FILE, "w") as f:
            f.write(creds.to_json())

    return creds