from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, tools_condition


from agents.common.state import AgentState
from agents.application_agent.nodes import chatbot

from agents.application_agent.tools import (
    evaluate_application,
    evaluate_all_applications,
)

from core.checkpointer import checkpointer

builder = StateGraph(AgentState)

builder.add_node(
    "chatbot",
    chatbot,
)

builder.add_node(
    "tools",
    ToolNode(
        [
            evaluate_application,
            evaluate_all_applications,
        ]
    ),
)

builder.add_edge(
    START,
    "chatbot",
)

builder.add_conditional_edges(
    "chatbot",
    tools_condition,
)

builder.add_edge(
    "tools",
    "chatbot",
)



graph = builder.compile(checkpointer=checkpointer)

