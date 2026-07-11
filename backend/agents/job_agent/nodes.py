from langgraph.types import interrupt
from langchain_core.messages import AIMessage, ToolMessage
from langchain_core.runnables import RunnableConfig

from agents.job_agent.state import JobAgentState
from agents.tools.job_description import generate_job_description, create_job
from agents.job_agent.prompts import SYSTEM_PROMPT
from core.llm.llm_client import get_llm

from services.job_service import JobService
from database.session import SessionLocal
from schemas.job_schema import JobCreate
import json

from datetime import datetime, timezone

llm_with_tools = get_llm().bind_tools([generate_job_description])


def chatbot_node(state: JobAgentState) -> dict:
    from langchain_core.messages import SystemMessage

    messages = [SystemMessage(content=SYSTEM_PROMPT), *state["messages"]]
    response = llm_with_tools.invoke(messages)
    return {"messages": [response]}


def route_after_chatbot(state: JobAgentState) -> str:
    last_message = state["messages"][-1]
    if getattr(last_message, "tool_calls", None):
        return "tools"
    return "end"


def apply_tool_result_node(state: JobAgentState) -> dict:
    last_message = state["messages"][-1]
    tool_result: dict = json.loads(last_message.content)


    print("=" * 50)
    print("RAW TOOL RESULT:", tool_result)
    print("=" * 50)
    if not tool_result.get("success"):
        return {
            "messages": [
                AIMessage(
                    content=tool_result.get(
                        "error", "Failed to generate the job description."
                    )
                )
            ]
        }

    deadline = datetime.fromisoformat(tool_result["application_deadline"])
    if deadline.tzinfo is None:
        deadline = deadline.replace(tzinfo=timezone.utc)

    print("tools reslut ", tool_result["generated_jd"])
    return {
        "generated_jd": tool_result["generated_jd"],
        "role": tool_result["role"],
        "application_deadline": deadline,
    }


def confirm_draft_node(state: JobAgentState) -> dict:
    answer = interrupt(
        {
            "question": "Create this job as a draft?",
            "summary": state["generated_jd"],
        }
    )
    return {"confirmed": answer == "yes"}


from exceptions.base import AppException


def create_draft_node(state: JobAgentState, config: RunnableConfig) -> dict:
    current_user = config["configurable"]["current_user"]

    job_data = JobCreate(
        role=state["role"],
        job_description=state["generated_jd"],
        application_deadline=state["application_deadline"],
    )

    db = SessionLocal()

    try:
        created_job = JobService.create_job(
            current_user=current_user,
            db=db,
            job_data=job_data,
        )

        return {
            "job_id": created_job.job_id,
            "messages": [
                AIMessage(
                    content=f"Draft job created successfully (ID: {created_job.job_id})."
                )
            ],
        }

    except AppException as e:
        return {"messages": [AIMessage(content=e.message)]}

    finally:
        db.close()


def decline_draft_node(state: JobAgentState) -> dict:
    return {"messages": [AIMessage(content="Okay, I won't create a draft.")]}


def route_after_confirm(state: JobAgentState) -> str:
    return "create_draft_node" if state["confirmed"] else "decline_draft_node"