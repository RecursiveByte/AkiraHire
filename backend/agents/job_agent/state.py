from datetime import datetime
from typing import TypedDict, Annotated

from langgraph.graph.message import add_messages
from langchain_core.messages import BaseMessage


class JobAgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    generated_jd: str
    role: str
    application_deadline: datetime
    confirmed: bool | None
    job_id: int | None