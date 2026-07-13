from langchain_core.tools import tool
from langchain_core.runnables import RunnableConfig
from sqlalchemy.orm import Session

from database.session import get_db
from agents.utils.config_helpers import get_current_user

from integration.google_form.services.google_form_service import (
    GoogleFormService,
)

from integration.google_form.exceptions.oauth_exceptions import (
    GoogleNotConnectedError,GoogleTokenRefreshError
)


@tool
def create_google_form(
    description: str,
    config: RunnableConfig,
) -> dict:
    """
   Create a Google Form from the user's natural language description.

    Use this tool whenever the user wants to create a Google Form, survey,
    questionnaire, feedback form, registration form, application form,
    quiz, or any other type of form. The description should include the
    purpose of the form and any fields or questions the user wants.

    The tool automatically:
    - Generates the form structure and questions.
    - Creates the Google Form.
    - Optionally creates and links a Google Sheet for responses if appropriate.
    - Returns the edit URL, responder URL, and response sheet URL (if created).
    """

    current_user = get_current_user(config)

    db: Session = next(get_db())

    try:
        response = GoogleFormService.create_google_form(
            user_id=current_user.user_id,
            db=db,
            description=description,
        )

        return {
            "form_edit_url": response.form_edit_url,
            "form_responder_url": response.form_responder_url,
            "response_sheet_url": response.response_sheet_url,
        }
        
    except (GoogleNotConnectedError, GoogleTokenRefreshError):
        return {
            "success": False,
            "error": "GOOGLE_NOT_CONNECTED",
            "message": (
                "The user's Google account is not connected. "
            ),
        }

    finally:
        db.close()