from agents.chatbot.tool_routes import TOOL_ROUTES


def should_continue(state):
    last = state["messages"][-1]
    print("\n")
    print("\n")
    print("this ", last)
    print("\n")
    print("\n")
    if last.tool_calls:
        return "tools"

    return "end"


def route_after_tool(state):
    print("routing rnning")
    tool_message = state["messages"][-1]

    return TOOL_ROUTES.get(
        tool_message.name,
        "chatbot",
    )