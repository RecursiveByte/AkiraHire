"""
Business logic for generating Google Forms.
"""

from sqlalchemy.orm import Session

from integration.google_form.clients.google_apps_script_client import (
    build_script_service,
    link_form_to_sheet,
)

from integration.google_form.clients.google_forms_client import (
    add_questions,
    build_form_service,
    create_form,
    form_edit_url,
    form_responder_url,
)

from integration.google_form.clients.google_sheets_client import (
    build_sheets_service,
    create_response_sheet,
    sheet_url,
)

from integration.google_form.clients.llm_form_schema_client import (
    generate_form_schema,
)

from integration.google_form.schemas.google_form_response import (
    GoogleFormResponse,
)

from integration.google_form.services.google_oauth_service import (
    get_google_credentials,
)


def create_google_form(
    user_id: int,
    db: Session,
    description: str,
) -> GoogleFormResponse:
    """
    Create a Google Form from a natural language description.
    """


    creds = get_google_credentials(
        user_id=user_id,
        db=db,
    )
    
    schema = generate_form_schema(description)

    forms_service = build_form_service(creds)

    form_id = create_form(
        forms_service,
        schema.form_title,
    )

    add_questions(
        forms_service,
        form_id,
        schema.questions,
    )

    response_sheet_url = None

    if schema.store_in_sheet:

        sheets_service = build_sheets_service(creds)

        spreadsheet_id = create_response_sheet(
            sheets_service,
            schema.form_title,
        )

        script_service = build_script_service(creds)

        link_form_to_sheet(
            script_service,
            form_id,
            spreadsheet_id,
        )

        response_sheet_url = sheet_url(
            spreadsheet_id,
        )

    return GoogleFormResponse(
        form_edit_url=form_edit_url(form_id),
    form_responder_url=form_responder_url(form_id),
    response_sheet_url=response_sheet_url,
    )