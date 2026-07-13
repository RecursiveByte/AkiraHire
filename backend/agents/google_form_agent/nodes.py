from core.llm.llm_client import get_llm

from agents.google_form_agent.prompts import SYSTEM_PROMPT
from agents.google_form_agent.state import GoogleFormAgentState
from agents.google_form_agent.tools import create_google_form
from agents.common.nodes import chatbot_node


google_form_llm = get_llm().bind_tools([create_google_form])

def chat_node(state: GoogleFormAgentState):
    return chatbot_node(
        state=state,
        llm=google_form_llm,
        system_prompt=SYSTEM_PROMPT,
    )