from datetime import datetime
from sqlalchemy.orm import Session

from integration.common.google_oauth.services.google_oauth_service import (
    GoogleOAuthService,
)

from integration.google_calendar.clients.google_calendar_client import (
    GoogleCalendarClient,
)
from integration.google_calendar.constants.constants import (
    CALENDAR_SCOPES,
    GOOGLE_CALENDAR_INTEGRATION_NAME,
)

from integration.google_calendar.schemas.create_calendar_event import CreateCalendarEventRequest

from uuid import uuid4


class GoogleCalendarService:

    @staticmethod
    def get_events(
        user_id: int,
        db: Session,
        start_time: datetime,
        end_time: datetime,
    ):

        credentials = GoogleOAuthService.get_google_credentials(
            user_id=user_id,
            db=db,
            scopes=CALENDAR_SCOPES,
            integration_name=GOOGLE_CALENDAR_INTEGRATION_NAME,
        )

        service = GoogleCalendarClient.build(credentials)

        events = (
            service.events()
            .list(
                calendarId="primary",
                timeMin=start_time.isoformat(),
                timeMax=end_time.isoformat(),
                singleEvents=True,
                orderBy="startTime",
            )
            .execute()
        )

        return events.get("items", [])
    
    @staticmethod
    def create_event(
        user_id: int,
        db: Session,
        payload: CreateCalendarEventRequest,
    ):

        credentials = GoogleOAuthService.get_google_credentials(
            user_id=user_id,
            db=db,
            scopes=CALENDAR_SCOPES,
            integration_name=GOOGLE_CALENDAR_INTEGRATION_NAME,
        )

        service = GoogleCalendarClient.build(credentials)

        event = {
            "summary": payload.title,
            "description": payload.description,
            "start": {
                "dateTime": payload.start_time.isoformat(),
                "timeZone": "Asia/Kolkata",
            },
            "end": {
                "dateTime": payload.end_time.isoformat(),
                "timeZone": "Asia/Kolkata",
            },
        }

        if payload.create_google_meet:

            event["conferenceData"] = {
                "createRequest": {
                    "requestId": str(uuid4()),
                    "conferenceSolutionKey": {
                        "type": "hangoutsMeet",
                    },
                }
            }

        created_event = (
            service.events()
            .insert(
                calendarId="primary",
                body=event,
                conferenceDataVersion=1,
            )
            .execute()
        )

        return created_event