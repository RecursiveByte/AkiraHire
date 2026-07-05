from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode

from agents.form_agent.state import FormAgentState
from agents.form_agent.tools import generate_form_schema
from agents.form_agent.nodes import (
    chatbot,
    route_after_chatbot,
    apply_tool_result_node,
    confirm_create_form_node,
    create_form_node,
    decline_form_node,
    route_after_confirm,
)
from core.checkpointer import checkpointer


def build_form_graph():
    builder = StateGraph(FormAgentState)

    builder.add_node("chatbot",chatbot )
    builder.add_node("tools", ToolNode([generate_form_schema]))
    builder.add_node("apply_tool_result_node", apply_tool_result_node)
    builder.add_node("confirm_create_form_node", confirm_create_form_node)
    builder.add_node("create_form_node", create_form_node)
    builder.add_node("decline_form_node", decline_form_node)

    builder.add_edge(START, "chatbot")

    builder.add_conditional_edges(
        "chatbot",
        route_after_chatbot,
        {"tools": "tools", "end": END},
    )

    builder.add_edge("tools", "apply_tool_result_node")
    builder.add_edge("apply_tool_result_node", "confirm_create_form_node")

    builder.add_conditional_edges(
        "confirm_create_form_node",
        route_after_confirm,
        {"create_form_node": "create_form_node", "decline_form_node": "decline_form_node"},
    )

    builder.add_edge("create_form_node", END)
    builder.add_edge("decline_form_node", END)

    return builder.compile(checkpointer=checkpointer)


graph = build_form_graph()