from langchain_core.messages import SystemMessage
from core.llm.llm_client import safe_invoke

from utils.logger import get_logger

logger = get_logger(__name__)


def chatbot_node(
    state,
    llm,
    system_prompt,
):
    messages = [
        SystemMessage(content=system_prompt),
        *state["messages"],
    ]

    response = safe_invoke(llm, messages)

    return {
        "messages": [response],
    }