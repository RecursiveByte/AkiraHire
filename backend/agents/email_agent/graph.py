from langgraph.graph import StateGraph, START, END

from agents.email_agent.state import EmailAgentState

from agents.email_agent.nodes import (
    parse_scheduling_request,
    check_calendar_connection,
    calendar_not_connected,
    get_calendar_context,
    allocate_interviews,
    execute_interviews,
)

from agents.email_agent.routing import route_after_calendar_check

from core.checkpointer import checkpointer


def build_email_graph():
    builder = StateGraph(EmailAgentState)

    builder.add_node(
        "parse_scheduling_request",
        parse_scheduling_request,
    )

    builder.add_node(
        "check_calendar_connection",
        check_calendar_connection,
    )

    builder.add_node(
        "calendar_not_connected",
        calendar_not_connected,
    )

    builder.add_node(
        "get_calendar_context",
        get_calendar_context,
    )

    builder.add_node(
        "allocate_interviews",
        allocate_interviews,
    )

    builder.add_node(
        "execute_interviews",
        execute_interviews,
    )

    builder.add_edge(
        START,
        "parse_scheduling_request",
    )

    builder.add_edge(
        "parse_scheduling_request",
        "check_calendar_connection",
    )

    builder.add_conditional_edges(
        "check_calendar_connection",
        route_after_calendar_check,
        {
            "get_calendar_context": "get_calendar_context",
            "calendar_not_connected": "calendar_not_connected",
        },
    )

    builder.add_edge(
        "calendar_not_connected",
        END,
    )

    builder.add_edge(
        "get_calendar_context",
        "allocate_interviews",
    )

    builder.add_edge(
        "allocate_interviews",
        "execute_interviews",
    )

    builder.add_edge(
        "execute_interviews",
        END,
    )

    return builder.compile(
        checkpointer=checkpointer,
    )


graph = build_email_graph()