"""
Google AutoForm orchestrator.

Flow:
1. Authenticate with Google APIs.
2. Generate a form schema from the user's description.
3. Create the Google Form.
4. Add questions to the form.
5. Optionally create a response sheet and link it to the form.
"""

from google_form_agent.auth.google_auth import get_credentials
from google_form_agent.services.google.forms_service import (
    build_form_service, create_form, add_questions,
    form_edit_url, form_responder_url,
)
from google_form_agent.services.google.sheets_service import build_sheets_service, create_response_sheet, sheet_url
from google_form_agent.services.google.linking_service import link_form_to_sheet
from google_form_agent.services.llm.schema_generator import generate_form_schema


def run_autoform_pipeline(user_description: str) -> dict:
    creds = get_credentials()

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