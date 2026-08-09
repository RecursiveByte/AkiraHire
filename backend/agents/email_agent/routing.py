from agents.email_agent.state import EmailAgentState


def route_after_calendar_check(state: EmailAgentState):
    if state["calendar_connected"]:
        return "chatbot"

    return "calendar_not_connected"