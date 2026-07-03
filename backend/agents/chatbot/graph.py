from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, tools_condition

from agents.chatbot.state import ChatState
from agents.chatbot.nodes import chatbot

from agents.tools.application_evaluation import (
    evaluate_application,evaluate_all_applications
)

from agents.tools.job_description import (
    generate_job_description,create_job
)

from core.checkpointer import checkpointer

builder = StateGraph(ChatState)

builder.add_node("chatbot", chatbot)
builder.add_node("tools", ToolNode([evaluate_application,evaluate_all_applications,generate_job_description,create_job]))

builder.add_edge(START, "chatbot")


builder.add_conditional_edges(
    "chatbot",
    tools_condition,
)


builder.add_edge("tools", "chatbot")

graph = builder.compile(
    checkpointer=checkpointer,
)