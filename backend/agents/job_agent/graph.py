from langgraph.graph import StateGraph, START, END

from agents.job_agent.state import JobAgentState
from agents.job_agent.nodes import (
    generate_jd_node,
    confirm_draft_node,
    create_draft_node,
    decline_draft_node,
    route_after_confirm,
)
from core.checkpointer import checkpointer


def build_job_graph():
    builder = StateGraph(JobAgentState)

    builder.add_node("generate_jd_node", generate_jd_node)
    builder.add_node("confirm_draft_node", confirm_draft_node)
    builder.add_node("create_draft_node", create_draft_node)
    builder.add_node("decline_draft_node", decline_draft_node)

    builder.add_edge(START, "generate_jd_node")
    builder.add_edge("generate_jd_node", "confirm_draft_node")

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