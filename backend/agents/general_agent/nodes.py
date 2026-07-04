from agents.common.nodes import chatbot_node

from core.llm.llm_client import get_llm

from agents.job_agent.prompts import SYSTEM_PROMPT

from agents.common.state import AgentState

llm = get_llm()


def chatbot(state : AgentState ):
    return chatbot_node(
        state=state,
        llm=llm,
        system_prompt=SYSTEM_PROMPT,
    )