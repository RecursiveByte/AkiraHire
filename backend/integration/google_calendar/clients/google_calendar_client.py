from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials


class GoogleCalendarClient:

    @staticmethod
    def build(credentials: Credentials):
        return build(
            "calendar",
            "v3",
            credentials=credentials,
            cache_discovery=False,
        )