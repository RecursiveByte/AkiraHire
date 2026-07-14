from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, tools_condition

from agents.linkedin_agent.nodes import (
    chat_node,
    create_draft_node,
)
from agents.linkedin_agent.state import LinkedInAgentState
from agents.linkedin_agent.tools import generate_linkedin_post

from core.checkpointer import checkpointer

builder = StateGraph(LinkedInAgentState)

builder.add_node("chatbot", chat_node)
builder.add_node("tools", ToolNode([generate_linkedin_post]))
builder.add_node("create_draft", create_draft_node)

builder.add_edge(START, "chatbot")

builder.add_conditional_edges(
    "chatbot",
    tools_condition,
    {
        "tools": "tools",
        END: END,
    },
)

builder.add_edge("tools", "create_draft")
builder.add_edge("create_draft", END)

graph = builder.compile(checkpointer=checkpointer)