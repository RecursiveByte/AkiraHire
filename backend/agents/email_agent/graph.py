from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, tools_condition

from agents.email_agent.state import EmailAgentState
from agents.email_agent.tools import get_calendar_events
from agents.email_agent.nodes import (
    check_calendar_connection,
    chatbot,
    calendar_not_connected,
)

from agents.email_agent.routing import route_after_calendar_check

from core.checkpointer import checkpointer


def build_email_graph():
    builder = StateGraph(EmailAgentState)

    builder.add_node(
        "check_calendar_connection",
        check_calendar_connection,
    )

    builder.add_node(
        "calendar_not_connected",
        calendar_not_connected,
    )

    builder.add_node(
        "chatbot",
        chatbot,
    )

    builder.add_node(
        "tools",
        ToolNode([get_calendar_events]),
    )

    builder.add_edge(
        START,
        "check_calendar_connection",
    )

    builder.add_conditional_edges(
        "check_calendar_connection",
        route_after_calendar_check,
        {
            "chatbot": "chatbot",
            "calendar_not_connected": "calendar_not_connected",
        },
    )

    builder.add_edge(
        "calendar_not_connected",
        END,
    )

    builder.add_conditional_edges(
        "chatbot",
        tools_condition,
        {
            "tools": "tools",
            END: END,
        },
    )

    builder.add_edge(
        "tools",
        "chatbot",
    )

    return builder.compile(
        checkpointer=checkpointer,
    )


graph = build_email_graph()