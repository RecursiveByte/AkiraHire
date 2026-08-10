from langchain_core.runnables import RunnableConfig

from agents.common.nodes import chatbot_node
from agents.email_agent.prompts import SYSTEM_PROMPT
from agents.email_agent.state import EmailAgentState
from agents.utils.config_helpers import get_current_user

from database.models.connected_account import ProviderType
from integration.service import IntegrationService

from core.llm.llm_client import get_llm
from agents.email_agent.tools import get_calendar_events,create_calendar_event

from langchain_core.messages import AIMessage

email_llm = get_llm().bind_tools(
    [get_calendar_events,create_calendar_event]
)


def check_calendar_connection(
    state: EmailAgentState,
    config: RunnableConfig,
):
    current_user = get_current_user(config)

    db = config["configurable"]["db"]

    connected = IntegrationService.is_connected(
        db=db,
        user_id=current_user.user_id,
        provider=ProviderType.GOOGLE,
        integration_name="google_calendar",
    )

    return {
        "calendar_connected": connected,
    }

def calendar_not_connected(state: EmailAgentState):
    return {
        "messages": [
            AIMessage(
                content="Your Google Calendar is not connected. Please connect the integration first."
            )
        ]
    }

def chatbot(
    state: EmailAgentState,
):
    return chatbot_node(
        state=state,
        llm=email_llm,
        system_prompt=SYSTEM_PROMPT,
    )