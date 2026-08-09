from typing import Annotated, TypedDict

from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages


class EmailAgentState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]
    calendar_connected: bool | None
    calendar_events: list[dict]