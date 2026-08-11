from typing import Annotated, TypedDict

from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages


class EmailAgentState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]

    calendar_connected: bool | None

    limit: int
    schedule_from: str
    interview_duration_minutes: int
    start_hour: int
    end_hour: int

    calendar_events: list[dict]
    candidates: list

    allocated_interviews: list[dict]

    scheduling_result: dict | None