from agents.google_form_agent.auth.google_auth import get_credentials, get_user_id_from_request, GoogleNotConnectedError
from agents.google_form_agent.services.google.forms_service import (
    build_form_service, create_form, add_questions,
    form_edit_url, form_responder_url,
)
from agents.google_form_agent.services.google.sheets_service import build_sheets_service, create_response_sheet, sheet_url
from agents.google_form_agent.services.google.linking_service import link_form_to_sheet
from agents.google_form_agent.services.llm.schema_generator import generate_form_schema
from sqlalchemy.orm import Session

AGENT_NAME = "forms_agent"

def run_autoform_pipeline(user_id: int, db: Session, user_description: str) -> dict:
    creds = get_credentials(user_id, AGENT_NAME, db)

    schema = generate_form_schema(user_description)

    forms_service = build_form_service(creds)
    form_id = create_form(forms_service, schema["form_title"])
    add_questions(forms_service, form_id, schema["questions"])

    result = {
        "form_edit_url": form_edit_url(form_id),
        "form_responder_url": form_responder_url(form_id),
        "sheet_url": None,
    }

    if schema.get("store_in_sheet"):
        sheets_service = build_sheets_service(creds)
        sheet_id = create_response_sheet(sheets_service, schema["form_title"])
        link_form_to_sheet(creds, form_id, sheet_id)
        result["sheet_url"] = sheet_url(sheet_id)

    return result