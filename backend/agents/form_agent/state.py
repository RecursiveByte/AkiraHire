
from typing import Annotated, TypedDict

from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages

from datetime import datetime

class FormAgentState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]
    job_id: int | None
    expires_at: datetime | None
    title: str
    form_description: str
    links: list[dict]
    additional_questions: list[dict]
    confirmed: bool