from langchain_core.messages import SystemMessage

from core.llm.llm_client import get_llm

from agents.common.state import AgentState
from agents.application_agent.prompts import SYSTEM_PROMPT

from agents.common.nodes import chatbot_node

from agents.tools.application_evaluation import (
    evaluate_application,
    evaluate_all_applications,
)

base_llm = get_llm()

llm = base_llm.bind_tools(
    [
        evaluate_application,
        evaluate_all_applications,
    ]
)

def chatbot(state: AgentState):
    return chatbot_node(
        state=state,
        llm=llm,
        system_prompt=SYSTEM_PROMPT,
    )