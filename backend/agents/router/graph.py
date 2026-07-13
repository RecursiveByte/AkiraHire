from langgraph.graph import (
    END,
    START,
    StateGraph,
)

from agents.router.nodes import router
from agents.router.state import RouterState

from core.checkpointer import checkpointer

builder = StateGraph(
    RouterState,
)

builder.add_node(
    "router",
    router,
)

builder.add_edge(
    START,
    "router",
)

builder.add_edge(
    "router",
    END,
)

graph = builder.compile(checkpointer=checkpointer)