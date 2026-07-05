from langchain_core.messages import SystemMessage,AIMessage
from groq import BadRequestError

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

    try:
        response = llm.invoke(messages)
    except BadRequestError as e:
        logger.warning("Tool call validation failed: %s", e)
        response = AIMessage(
            content=(
                "I need a bit more information before I can do that — could you "
                "confirm the specific application ID you'd like me to evaluate?"
            )
        )

    return {
        "messages": [response],
    }