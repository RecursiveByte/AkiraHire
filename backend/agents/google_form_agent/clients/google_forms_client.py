"""
Google Forms client.

Responsible only for communicating with the Google Forms API.
Contains no business logic.
"""

import logging

from googleapiclient.discovery import Resource, build
from googleapiclient.errors import HttpError

from agents.google_form_agent.exceptions.google_exceptions import (
    GoogleFormsClientError,
)
from agents.google_form_agent.schemas.generated_form_schema import (
    QuestionSchema,
)

logger = logging.getLogger(__name__)


def build_form_service(creds) -> Resource:
    """
    Build and return the Google Forms service.
    """
    return build("forms", "v1", credentials=creds)


def create_form(
    service: Resource,
    title: str,
) -> str:
    """
    Create an empty Google Form.

    Returns:
        str: Google Form ID
    """

    body = {
        "info": {
            "title": title,
            "documentTitle": title,
        }
    }

    try:

        response = service.forms().create(
            body=body,
        ).execute()

        return response["formId"]

    except HttpError as e:

        logger.exception(
            "Failed to create Google Form."
        )

        raise GoogleFormsClientError(
            "Failed to create Google Form."
        ) from e


def add_questions(
    service: Resource,
    form_id: str,
    questions: list[QuestionSchema],
) -> None:
    """
    Add questions to a Google Form.
    """

    requests = []

    for index, question in enumerate(questions):

        question_payload = {
            "required": question.required,
        }

        if question.type == "TEXT":

            question_payload["textQuestion"] = {
                "paragraph": question.paragraph,
            }

        elif question.type in ("RADIO", "CHECKBOX"):

            question_payload["choiceQuestion"] = {
                "type": question.type,
                "options": [
                    {
                        "value": option,
                    }
                    for option in question.options
                ],
            }

        elif question.type == "SCALE":

            question_payload["scaleQuestion"] = {
                "low": question.low,
                "high": question.high,
            }
        
        elif question.type == "FILE":
            question_payload["fileUploadQuestion"] = {}

        else:

            raise GoogleFormsClientError(
                f"Unsupported question type: {question.type}"
            )

        requests.append(
            {
                "createItem": {
                    "item": {
                        "title": question.title,
                        "questionItem": {
                            "question": question_payload,
                        },
                    },
                    "location": {
                        "index": index,
                    },
                }
            }
        )

    try:

        service.forms().batchUpdate(
            formId=form_id,
            body={
                "requests": requests,
            },
        ).execute()

    except HttpError as e:

        logger.exception(
            "Failed to add questions to Google Form."
        )

        raise GoogleFormsClientError(
            "Failed to add questions to Google Form."
        ) from e


def form_edit_url(form_id: str) -> str:
    """
    Return the edit URL of a Google Form.
    """
    return f"https://docs.google.com/forms/d/{form_id}/edit"


def form_responder_url(form_id: str) -> str:
    """
    Return the public responder URL of a Google Form.
    """
    return f"https://docs.google.com/forms/d/{form_id}/viewform"