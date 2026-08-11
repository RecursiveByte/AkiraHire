from datetime import datetime, timedelta

from pydantic import BaseModel
from langchain_core.messages import AIMessage
from langchain_core.runnables import RunnableConfig

from agents.email_agent.state import EmailAgentState
from agents.utils.config_helpers import get_current_user

from core.llm.llm_client import get_llm

import asyncio

from database.models.connected_account import ProviderType
from integration.service import IntegrationService

from integration.google_calendar.services.google_calendar_service import (
    GoogleCalendarService,
)

from services.application_evaluation_service import (
    ApplicationEvaluationService,
)

from services.email_service import EmailService

from integration.google_calendar.schemas.create_calendar_event import (
    CreateCalendarEventRequest,
)

from agents.email_agent.prompts import ALLOCATION_PROMPT


email_llm = get_llm()



class SchedulingRequest(BaseModel):
    limit: int
    schedule_from: str
    interview_duration_minutes: int
    start_hour: int
    end_hour: int


def parse_scheduling_request(
    state: EmailAgentState,
    config: RunnableConfig,
):
    llm = get_llm().with_structured_output(
        SchedulingRequest
    )

    message = state["messages"][-1].content

    result = llm.invoke(
        [
            {
                "role": "system",
                "content": """
Extract the interview scheduling requirements from
the recruiter's request.

Return:
- limit
- schedule_from
- interview_duration_minutes
- start_hour
- end_hour

Convert relative dates such as today, tomorrow,
next Monday, etc. into ISO 8601 datetime strings
using Asia/Kolkata timezone.

schedule_from must include the timezone offset.

Example:
2026-08-12T09:00:00+05:30
""",
            },
            {
                "role": "user",
                "content": message,
            },
        ]
    )

    return {
        "limit": result.limit,
        "schedule_from": result.schedule_from,
        "interview_duration_minutes": result.interview_duration_minutes,
        "start_hour": result.start_hour,
        "end_hour": result.end_hour,
    }

def check_calendar_connection(
    state: EmailAgentState,
    config: RunnableConfig,
):
    current_user = get_current_user(config)

    db = config["configurable"]["db"]

    connected = IntegrationService.is_connected(
        db=db,
        user_id=current_user.user_id,
        provider=ProviderType.GOOGLE,
        integration_name="google_calendar",
    )

    return {
        "calendar_connected": connected,
    }


def calendar_not_connected(
    state: EmailAgentState,
):
    return {
        "messages": [
            AIMessage(
                content=(
                    "Your Google Calendar is not connected. "
                    "Please connect the integration first."
                )
            )
        ]
    }


def get_calendar_context(
    state: EmailAgentState,
    config: RunnableConfig,
):
    current_user = get_current_user(config)

    db = config["configurable"]["db"]

    schedule_from = datetime.fromisoformat(
        state["schedule_from"]
    )

    schedule_end = schedule_from + timedelta(days=30)

    calendar_events = GoogleCalendarService.get_events(
        user_id=current_user.user_id,
        db=db,
        start_time=schedule_from,
        end_time=schedule_end,
    )

    candidates = (
        ApplicationEvaluationService.get_top_by_recruiter_id(
            db=db,
            recruiter_id=current_user.user_id,
            limit=state["limit"],
            status="SHORTLISTED",
        )
    )

    return {
        "calendar_events": calendar_events,
        "candidates": candidates,
        "calendar_start": schedule_from.isoformat(),
        "calendar_end": schedule_end.isoformat(),
    }


class InterviewSlot(BaseModel):
    candidate_name: str
    candidate_email: str
    role: str
    start_time: str
    end_time: str


class InterviewAllocation(BaseModel):
    interviews: list[InterviewSlot]

def allocate_interviews(
    state: EmailAgentState,
):
    
    email_llm = get_llm().with_structured_output(
    InterviewAllocation
)
    response = email_llm.invoke(
        [
            {
                "role": "system",
                "content": ALLOCATION_PROMPT,
            },
            {
                "role": "user",
                "content": f"""
Candidates:
{state["candidates"]}

Calendar events:
{state["calendar_events"]}

Schedule from:
{state["schedule_from"]}

Interview duration:
{state["interview_duration_minutes"]} minutes

Working hours:
{state["start_hour"]}:00 - {state["end_hour"]}:00
""",
            },
        ]
    )

    return {
        "allocated_interviews": [
            interview.model_dump()
            for interview in response.interviews
        ]
    }


def execute_interviews(
    state: EmailAgentState,
    config: RunnableConfig,
):
    current_user = get_current_user(config)

    db = config["configurable"]["db"]

    scheduled = []

    for interview in state["allocated_interviews"]:

        start = datetime.fromisoformat(
            interview["start_time"]
        )

        end = datetime.fromisoformat(
            interview["end_time"]
        )

        payload = CreateCalendarEventRequest(
            title=(
                f"Interview - "
                f"{interview['candidate_name']} - "
                f"{interview['role']}"
            ),
            description=(
                f"Interview with "
                f"{interview['candidate_name']} "
                f"for the {interview['role']} position."
            ),
            start_time=start,
            end_time=end,
            create_google_meet=True,
        )

        created_event = GoogleCalendarService.create_event(
            user_id=current_user.user_id,
            db=db,
            payload=payload,
        )

        meet_link = None

        conference_data = created_event.get(
            "conferenceData",
            {},
        )

        for entry_point in conference_data.get(
            "entryPoints",
            [],
        ):
            if entry_point.get("entryPointType") == "video":
                meet_link = entry_point.get("uri")
                break

        subject = (
            f"Interview Scheduled - "
            f"{interview['role']} at AkiraHire"
        )

        body = f"""
        <html>
            <body>
                <p>Hi {interview['candidate_name']},</p>

                <p>
                    Your interview has been scheduled for the
                    <strong>{interview['role']}</strong>
                    position at AkiraHire.
                </p>

                <p>
                    <strong>Date:</strong>
                    {start.strftime("%B %d, %Y")}
                </p>

                <p>
                    <strong>Time:</strong>
                    {start.strftime("%I:%M %p")} IST
                </p>

                <p>
                    <strong>Google Meet:</strong>
                    <a href="{meet_link}">
                        Join Interview
                    </a>
                </p>

                <p>
                    Best regards,<br>
                    AkiraHire Team
                </p>
            </body>
        </html>
        """

        asyncio.run(
                   EmailService.send_email(
                       to=interview["candidate_email"],
                       subject=subject,
                       body=body,
                   )
               )
        
        scheduled.append(
            {
                "candidate_name": interview["candidate_name"],
                "candidate_email": interview["candidate_email"],
                "role": interview["role"],
                "start_time": start.isoformat(),
                "end_time": end.isoformat(),
                "meet_link": meet_link,
            }
        )

    return {
        "scheduled_interviews": scheduled,
    }