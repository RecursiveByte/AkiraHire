from langchain_core.messages import AIMessage
from langchain_core.runnables import RunnableConfig
from langgraph.types import interrupt

from agents.common.nodes import chatbot_node
from core.llm.llm_client import get_llm
from agents.linkedin_agent.prompts import SYSTEM_PROMPT
from agents.linkedin_agent.state import LinkedInAgentState

from agents.utils.config_helpers import (
    get_current_user,
    get_db_session,
)

from integration.linkedin.services.linkedin.posting_service import (
    LinkedInPostingService,
)
from agents.linkedin_agent.tools import generate_linkedin_post

llm = get_llm().bind_tools([generate_linkedin_post])


def chat_node(
    state: LinkedInAgentState,
) -> dict:
    return chatbot_node(
        state=state,
        llm=llm,
        system_prompt=SYSTEM_PROMPT,
    )


def create_draft_node(
    state: LinkedInAgentState,
    config: RunnableConfig,
) -> dict:

    generated_post = state.get("post_text")
    generated_title = state.get("post_title")

    if not generated_post:
        return {
            "messages": [
                AIMessage(
                    content="I wasn't able to generate a post — could you try again?"
                )
            ]
        }

    if not generated_title:
        return {
            "messages": [
                AIMessage(
                    content="I wasn't able to generate a title — could you try again?"
                )
            ]
        }

    approved = interrupt(
        {
            "summary": generated_post,
            "question": (
                "I have generated your LinkedIn post.\n\n"
                "Would you like me to save it as a draft?"
            ),
        }
    )

    if approved.strip().lower() != "yes":
        return {
            "messages": [AIMessage(content="Okay! I won't save this LinkedIn post.")]
        }

    current_user = get_current_user(config)
    db = get_db_session(config)

    draft = LinkedInPostingService.save_draft(
        db=db,
        user_id=current_user.user_id,
        title=generated_title,
        post_text=generated_post,
    )

    draft_id = draft["draft_id"]

    return {
        "messages": [
            AIMessage(
                content=(
                    "Your LinkedIn post has been saved successfully.\n\n"
                    f"Draft ID: {draft_id}"
                )
            )
        ]
    }
