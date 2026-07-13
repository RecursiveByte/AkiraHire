from langgraph.graph import START, END, StateGraph
from langgraph.prebuilt import ToolNode, tools_condition

from agents.google_form_agent.nodes import chat_node
from agents.google_form_agent.state import GoogleFormAgentState
from agents.google_form_agent.tools import create_google_form

from core.checkpointer import checkpointer


builder = StateGraph(GoogleFormAgentState)

builder.add_node("chat", chat_node)
builder.add_node(
    "tools",
    ToolNode([create_google_form]),
)

builder.add_edge(START, "chat")

builder.add_conditional_edges(
    "chat",
    tools_condition,
    {
        "tools": "tools",
        END: END,
    },
)

builder.add_edge("tools", "chat")

graph = builder.compile(checkpointer=checkpointer)