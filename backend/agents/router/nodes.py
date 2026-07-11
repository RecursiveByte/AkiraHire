from langchain_core.messages import (
    HumanMessage,
    SystemMessage,
)

from core.llm.llm_client import get_llm, safe_invoke

from agents.router.prompts import SYSTEM_PROMPT
from agents.router.schemas import RouterResponse
from agents.router.state import RouterState


llm = get_llm().with_structured_output(
    RouterResponse,
)


def router(state: RouterState):

    latest_message = state["messages"][-1]

    response = safe_invoke(
        llm,
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=latest_message.content),
        ],
    )

    print("=" * 50)
    print(response)
    print("=" * 50)

    return {
        "agent": response.agent,
    }