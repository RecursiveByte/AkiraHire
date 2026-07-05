from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode

from agents.job_agent.state import JobAgentState
from agents.tools.job_description import generate_job_description
from agents.job_agent.nodes import (
    chatbot_node,
    route_after_chatbot,
    apply_tool_result_node,
    confirm_draft_node,
    create_draft_node,
    decline_draft_node,
    route_after_confirm,
)
from core.checkpointer import checkpointer


def build_job_graph():
    builder = StateGraph(JobAgentState)

    builder.add_node("chatbot", chatbot_node)
    builder.add_node("tools", ToolNode([generate_job_description]))
    builder.add_node("apply_tool_result_node", apply_tool_result_node)
    builder.add_node("confirm_draft_node", confirm_draft_node)
    builder.add_node("create_draft_node", create_draft_node)
    builder.add_node("decline_draft_node", decline_draft_node)

    builder.add_edge(START, "chatbot")

    builder.add_conditional_edges(
        "chatbot",
        route_after_chatbot,
        {"tools": "tools", "end": END},
    )

    builder.add_edge("tools", "apply_tool_result_node")
    builder.add_edge("apply_tool_result_node", "confirm_draft_node")

    builder.add_conditional_edges(
        "confirm_draft_node",
        route_after_confirm,
        {
            "create_draft_node": "create_draft_node",
            "decline_draft_node": "decline_draft_node",
        },
    )

    builder.add_edge("create_draft_node", END)
    builder.add_edge("decline_draft_node", END)

    return builder.compile(checkpointer=checkpointer)


graph = build_job_graph()