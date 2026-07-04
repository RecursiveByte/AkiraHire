def should_continue(state):

    last = state["messages"][-1]

    if last.tool_calls:
        return "tools"

    return "end"


from agents.job_agent.tool_routes import TOOL_ROUTES


def route_after_tool(state):

    tool_message = state["messages"][-1]

    return TOOL_ROUTES.get(
        tool_message.name,
        "chatbot",
    )