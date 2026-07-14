from typing import Annotated, Optional

from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages
from typing_extensions import TypedDict


class LinkedInAgentState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]
    post_text: Optional[str]
    post_title: Optional[str]