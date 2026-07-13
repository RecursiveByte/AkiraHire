import json

from langchain_core.messages import AIMessage, SystemMessage
from langchain_core.runnables import RunnableConfig
from langgraph.types import interrupt

from agents.form_agent.state import FormAgentState
from agents.form_agent.prompts import SYSTEM_PROMPT
from agents.form_agent.tools import generate_form_schema
from core.llm.llm_client import get_llm

from schemas.form_schema import (
    CreateFormRequest,
    GeneratedFormSchemaResponse,
    LinkField,
    AdditionalQuestion,
)

from exceptions.base import AppException

from services.form_service import FormService
from database.session import SessionLocal
from schemas.form_schema import CreateFormRequest
from agents.common.nodes import chatbot_node

from agents.utils.config_helpers import  get_current_user

llm_with_tools = get_llm().bind_tools([generate_form_schema])


def chatbot(state: FormAgentState) -> dict:
    return chatbot_node(
        state=state,
        llm=llm_with_tools,
        system_prompt=SYSTEM_PROMPT,
    )


def route_after_chatbot(state: FormAgentState) -> str:
    last_message = state["messages"][-1]
    if getattr(last_message, "tool_calls", None):
        return "tools"
    return "end"


def apply_tool_result_node(state: FormAgentState) -> dict:
    last_message = state["messages"][-1]
    tool_result: dict = json.loads(last_message.content)

    if not tool_result.get("success"):
        return {
            "messages": [
                AIMessage(
                    content=tool_result.get(
                        "error", "Failed to generate the form schema."
                    )
                )
            ]
        }

    return {
        "title": tool_result["title"],
        "form_description": tool_result["description"],
        "links": tool_result["links"],
        "additional_questions": tool_result["additional_questions"],
    }


from datetime import datetime, timezone


def confirm_create_form_node(state: FormAgentState) -> dict:
    questions_text = (
        "\n".join(
            f"- {q['question']} ({q['type']})" for q in state["additional_questions"]
        )
        or "None"
    )

    links_text = "\n".join(f"- {link['label']}" for link in state["links"]) or "None"

    summary = (
        f"**{state['title']}**\n{state['form_description']}\n\n"
        f"Links:\n{links_text}\n\n"
        f"Questions:\n{questions_text}"
    )

    answer = interrupt(
        {
            "question": (
                "Create this form? Reply 'yes <job_id> <expiry_date>' "
                "(e.g. 'yes 42 2026-08-15') to confirm, or 'no' to cancel."
            ),
            "summary": summary,
        }
    )

    normalized = answer.strip().lower()

    if not normalized.startswith("yes"):
        return {"confirmed": False, "job_id": None, "expires_at": None}

    parts = answer.split()

    job_id = None
    expires_at = None

    for part in parts[1:]:
        if job_id is None and part.isdigit():
            job_id = int(part)
            continue
        if expires_at is None:
            try:
                expires_at = datetime.fromisoformat(part).replace(tzinfo=timezone.utc)
            except ValueError:
                continue

    if job_id is None or expires_at is None:
        return {"confirmed": False, "job_id": None, "expires_at": None}

    return {"confirmed": True, "job_id": job_id, "expires_at": expires_at}



def create_form_node(state: FormAgentState, config: RunnableConfig) -> dict:
    
    current_user = get_current_user(config)

    recruiter_id = current_user.user_id
    if not recruiter_id:
        return {
            "messages": [AIMessage(content="Something went wrong. Please try again.")]
        }

    form_schema = GeneratedFormSchemaResponse(
        title=state["title"],
        description=state["form_description"],
        links=[LinkField(**link) for link in state["links"]],
        additional_questions=[
            AdditionalQuestion(**q) for q in state["additional_questions"]
        ],
    )

    payload = CreateFormRequest(
        job_id=state["job_id"],
        form_schema_json=form_schema,
        expires_at=state["expires_at"],
    )

    db = SessionLocal()
    try:
        created_form = FormService.create_form(
            payload=payload,
            recruiter_id=recruiter_id,
            db=db,
        )
    except AppException as e:
        return {"messages": [AIMessage(content=str(e))]}
    finally:
        db.close()

    return {
        "messages": [
            AIMessage(
                content=(
                    f"Form created successfully for job ID {state['job_id']} "
                    f"(Form ID: {created_form.form_id}), expiring on "
                    f"{created_form.expires_at.date()}."
                )
            )
        ],
    }


def decline_form_node(state: FormAgentState) -> dict:
    return {"messages": [AIMessage(content="Okay, I won't create the form.")]}


def route_after_confirm(state: FormAgentState) -> str:
    if state["confirmed"] and state.get("job_id") and state.get("expires_at"):
        return "create_form_node"
    return "decline_form_node"
