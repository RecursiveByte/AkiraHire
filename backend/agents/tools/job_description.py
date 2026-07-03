from langchain_core.tools import tool

from exceptions.base import AppException
from services.job_description_service import JobDescriptionService

from services.job_service import (
    JobService
)


from schemas.job_schema import JobCreate

from langgraph.config import get_config

from database.session import SessionLocal

from datetime import datetime


@tool
def generate_job_description(description: str) -> dict:
    """
    Generate a complete professional job description.

    Use this tool ONLY when the user explicitly asks you to create or
    generate a job description and has already provided enough information
    about the role.

    Required information inside `description` may include:
    - Job title
    - Responsibilities
    - Required skills
    - Experience
    - Employment type
    - Location
    - Additional requirements

    Do NOT call this tool when:
    - The user asks whether you can generate job descriptions.
    - The user asks how job descriptions are created.
    - The user asks what this tool does.

    If the user has not provided enough information,
    ask for more details instead of calling this tool.

    Returns:
        {
            "success": bool,
            "job_description": str
        }
    """
    try:
        result = JobDescriptionService.generate_job_description(
            description=description,
        )

        return {
            "success": True,
            "job_description": result.job_description,
        }

    except AppException as e:
        return {
            "success": False,
            "error": str(e),
        }

    except Exception:
        return {
            "success": False,
            "error": "Failed to generate the job description.",
        }
        
        
@tool
def create_job(
    role: str,
    job_description: str,
    application_deadline: datetime,
) -> dict:
    """
Create a new job in the database.

Use this tool ONLY after:
1. A complete job description has already been generated or provided.
2. The user has explicitly confirmed that they want to create the job.

Do NOT call this tool immediately after generating a job description.

Instead, first present the job description to the user and ask:

"Would you like me to create this job as a draft?"

Only if the user confirms with responses such as:
- Yes
- Create it
- Save it
- Looks good
- Proceed

should this tool be called.
"""



    config = get_config()
    current_user = config["configurable"]["current_user"]

    db = SessionLocal()

    try:
        job = JobService.create_job(
            current_user=current_user,
            db=db,
            job_data=JobCreate(
                role=role,
                job_description=job_description,
                application_deadline=datetime.fromisoformat(
                    application_deadline.replace("Z", "+00:00")
                ),
            ),
        )

        return {
            "success": True,
            "job_id": job.job_id,
            "role": job.role,
            "status": job.status.value,
            "message": "Job created successfully as a draft.",
        }

    except AppException as e:
        return {
            "success": False,
            "error": str(e),
        }

    finally:
        db.close()