import json

from langchain_core.tools import tool

from exceptions.form_exceptions import InvalidFormSchemaError
from services.form_schema_generator_service import FormSchemaService


@tool
def generate_form_schema(description: str) -> str:
    """
    Generate an application form schema (screening questions, profile links) based
    on the recruiter's description of what the form should ask candidates.

    This tool ONLY generates the form content — it does NOT save anything to the
    database and does NOT need a job_id.

    Input:
        description: What the form should ask candidates — e.g. required profile
            links (GitHub, LinkedIn, portfolio) and screening questions.

    Returns:
        JSON string: {"success": bool, "title": str, "description": str,
            "links": [...], "additional_questions": [...], "error": str (if failed)}
    """
    print(">>> generate_form_schema tool called")

    try:
        schema = FormSchemaService.generate_form_schema(description=description)

        return json.dumps({
            "success": True,
            "title": schema.title,
            "description": schema.description,
            "links": [link.model_dump() for link in schema.links],
            "additional_questions": [q.model_dump() for q in schema.additional_questions],
        })

    except InvalidFormSchemaError:
        return json.dumps({
            "success": False,
            "error": "Failed to generate a valid form schema. Please try describing the form again.",
        })

    except Exception:
        return json.dumps({
            "success": False,
            "error": "Something went wrong while generating the form.",
        })