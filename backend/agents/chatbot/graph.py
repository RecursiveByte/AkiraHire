from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode

from agents.chatbot.state import ChatState

from agents.chatbot.nodes import (
    chatbot,
    ask_create_job_confirmation,
)

from agents.chatbot.routing import (
    should_continue,
    route_after_tool,
)

from agents.tools.application_evaluation import (
    evaluate_application,
    evaluate_all_applications,
)

from agents.tools.job_description import (
    generate_job_description,
    create_job,
)

from core.checkpointer import checkpointer


builder = StateGraph(ChatState)

builder.add_node("chatbot", chatbot)

builder.add_node(
    "tools",
    ToolNode(
        [
            evaluate_application,
            evaluate_all_applications,
            generate_job_description,
            create_job,
        ]   
    ),
)

builder.add_node(
    "ask_create_job_confirmation",
    ask_create_job_confirmation,
)

builder.add_edge(
    START,
    "chatbot",
)

builder.add_conditional_edges(
    "chatbot",
    should_continue,
    {
        "tools": "tools",
        "end": END,
    },
)

builder.add_conditional_edges(
    "tools",
    route_after_tool,
    {
        "chatbot": "chatbot",
        "ask_create_job_confirmation": "ask_create_job_confirmation",
    },
)

builder.add_edge(
    "ask_create_job_confirmation",
    END,
)

graph = builder.compile(
    checkpointer=checkpointer,
)