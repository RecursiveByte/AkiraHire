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