from langgraph.graph import (
    START,
    END,
    StateGraph,
)

from core.checkpointer import checkpointer

from agents.general_agent.nodes import chatbot
from agents.common.state import AgentState


builder = StateGraph(AgentState)

builder.add_node(
    "chatbot",
    chatbot,
)

builder.add_edge(
    START,
    "chatbot",
)

builder.add_edge(
    "chatbot",
    END,
)

graph = builder.compile(
    checkpointer=checkpointer,
)