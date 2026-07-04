from typing import Annotated, TypedDict

from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages

from agents.router.schemas import AgentType


class RouterState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]
    agent: AgentType