from datetime import datetime, timedelta, timezone

from langchain_core.runnables import RunnableConfig
from langchain_core.tools import tool

from agents.utils.config_helpers import get_current_user
from integration.google_calendar.services.google_calendar_service import (
    GoogleCalendarService,
)


@tool
def get_calendar_events(
    start_time: str | None,
    end_time: str | None,
    config: RunnableConfig,
) -> dict:
    """
    Retrieve the recruiter's Google Calendar events.

    Use this tool when the recruiter wants to check their calendar,
    schedule, meetings, events, busy times, or availability.

    If the recruiter specifies a date or time range, use that range.

    If no date or time range is specified, pass None for start_time
    and end_time. The tool will default to the previous 30 days.

    start_time and end_time must be ISO 8601 datetime strings when
    provided.

    Use Asia/Kolkata as the recruiter's timezone.

    This tool only reads calendar events.
    """

    current_user = get_current_user(config)
    db = config["configurable"]["db"]

    now = datetime.now(timezone.utc)

    if start_time is None:
        start = now - timedelta(days=30)
    else:
        start = datetime.fromisoformat(start_time)

    if end_time is None:
        end = now
    else:
        end = datetime.fromisoformat(end_time)

    if start.tzinfo is None:
        start = start.replace(tzinfo=timezone.utc)

    if end.tzinfo is None:
        end = end.replace(tzinfo=timezone.utc)

    if start >= end:
        raise ValueError("start_time must be before end_time")

    events = GoogleCalendarService.get_events(
        user_id=current_user.user_id,
        db=db,
        start_time=start,
        end_time=end,
    )

    return {
        "events": events,
        "start_time": start.isoformat(),
        "end_time": end.isoformat(),
    }

from integration.google_calendar.schemas.create_calendar_event import (
    CreateCalendarEventRequest,
)


@tool
def create_calendar_event(
    title: str,
    start_time: str,
    end_time: str,
    config: RunnableConfig,
    description: str = "",
    create_google_meet: bool = False,
) -> dict:
    """
    Create an event in the recruiter's Google Calendar.

    Use this tool when the recruiter explicitly asks to create,
    schedule, or add a meeting or event to their calendar.

    Required:
    - title
    - start_time
    - end_time

    Optional:
    - description
    - create_google_meet

    Set create_google_meet to true only when the recruiter wants
    a Google Meet link for the event.

    The current recruiter is determined from the authenticated
    user in the request. Never ask the LLM for or accept a user_id.

    Google Calendar connection is checked by the workflow before
    this tool is available.

    This tool only creates a new calendar event. It does not
    retrieve, update, or delete events.
    """
    

    
    current_user = get_current_user(config)

    db = config["configurable"]["db"]
    
    start = datetime.fromisoformat(start_time)
    end = datetime.fromisoformat(end_time)
    
    if start.tzinfo is None or end.tzinfo is None:
        raise ValueError(
            "start_time and end_time must include a timezone offset."
        )
    if start >= end:
        raise ValueError("start_time must be before end_time")
    
    print("=" * 30)
    print("TOOL START:", start)
    print("TOOL END:", end)
    print("TOOL START ISO:", start.isoformat())
    print("TOOL END ISO:", end.isoformat())
    print("=" * 30)

    payload = CreateCalendarEventRequest(
        title=title,
        description=description,
        start_time=start_time,
        end_time=end_time,
        create_google_meet=create_google_meet,
    )

    return GoogleCalendarService.create_event(
        user_id=current_user.user_id,
        db=db,
        payload=payload,
    )