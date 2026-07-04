from langgraph.types import interrupt

from agents.job_agent.state import JobAgentState
from services.job_description_service import JobDescriptionService
from services.job_service import JobService
from langchain_core.messages import AIMessage

from langchain_core.runnables import RunnableConfig

from database.session import SessionLocal

from schemas.job_schema import JobCreate

from datetime import datetime, time,timezone

def generate_jd_node(state: JobAgentState) -> dict:
    last_message = state["messages"][-1]
    description = last_message.content
    response = JobDescriptionService.generate_job_description(description)
    
    deadline_datetime = datetime.combine(
        response.application_deadline, time.min
    ).replace(tzinfo=timezone.utc)
    
    return {
        "generated_jd": response.job_description,
        "role": response.role,
        "application_deadline": deadline_datetime,
    }



def confirm_draft_node(state: JobAgentState) -> dict:
    answer = interrupt(
        {
            "question": "Create this job as a draft?",
            "summary": state["generated_jd"][:200],
        }
    )
    return {"confirmed": answer == "yes"}

def create_draft_node(state: JobAgentState, config: RunnableConfig) -> dict:
    current_user = config["configurable"]["current_user"]


    job_data = JobCreate(
        role=state["role"],
        job_description=state["generated_jd"],
        application_deadline=state["application_deadline"],
    )

    db = SessionLocal()
    created_job = JobService.create_job(
        current_user=current_user,
        db=db,
        job_data=job_data,
    )

    return {
        "job_id": created_job.job_id,
        "messages": [
            AIMessage(
                content=(
                    f"✅ Draft job created successfully (ID: {created_job.job_id}).\n\n"
                    f"{state['generated_jd']}"
                )
            )
        ],
    }

def decline_draft_node(state: JobAgentState) -> dict:
    return {"messages": [AIMessage(content="Okay, I won't create a draft.")]}


def route_after_confirm(state: JobAgentState) -> str:
    return "create_draft_node" if state["confirmed"] else "decline_draft_node"