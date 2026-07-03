from langchain_core.messages import SystemMessage

from core.llm.llm_client import get_llm

from agents.chatbot.prompts import SYSTEM_PROMPT
from agents.chatbot.state import ChatState

from agents.tools.application_evaluation import (
    evaluate_application,evaluate_all_applications
)

from agents.tools.job_description import(
    generate_job_description,create_job
)

base_llm = get_llm()

llm_with_tools = base_llm.bind_tools([evaluate_application,evaluate_all_applications,generate_job_description,create_job])


def chatbot(state: ChatState):
    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        *state["messages"],
    ]

    response = llm_with_tools.invoke(messages)

    return {
        "messages": [response]
    }