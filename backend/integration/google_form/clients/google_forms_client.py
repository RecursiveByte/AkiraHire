"""
Google Forms client.

Responsible only for communicating with the Google Forms API.
Contains no business logic.
"""

from googleapiclient.discovery import (
    Resource,
    build,
)
from googleapiclient.errors import (
    HttpError,
)

from integration.google_form.exceptions.google_exceptions import (
    GoogleFormsClientError,
)

from integration.google_form.schemas.generated_form_schema import (
    QuestionSchema,
)

from utils.logger import get_logger

logger = get_logger(__name__)


def build_form_service(
    creds,
) -> Resource:

    return build(
        "forms",
        "v1",
        credentials=creds,
    )


def create_form(
    service: Resource,
    title: str,
) -> str:

    body = {
        "info": {
            "title": title,
            "documentTitle": title,
        }
    }

    try:

        response = (
            service.forms()
            .create(
                body=body,
            )
            .execute()
        )

        return response["formId"]

    except HttpError:

        logger.exception(
            "Failed to create Google Form."
        )

        raise GoogleFormsClientError()


def add_questions(
    service: Resource,
    form_id: str,
    questions: list[QuestionSchema],
) -> None:

    requests = []

    for index, question in enumerate(
        questions,
    ):

        question_payload = {
            "required": question.required,
        }

        if question.type == "TEXT":

            question_payload["textQuestion"] = {
                "paragraph": question.paragraph,
            }

        elif question.type in (
            "RADIO",
            "CHECKBOX",
        ):

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

            logger.error(
                f"Unsupported question type: {question.type}"
            )

            raise GoogleFormsClientError()

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

        (
            service.forms()
            .batchUpdate(
                formId=form_id,
                body={
                    "requests": requests,
                },
            )
            .execute()
        )

    except HttpError:

        logger.exception(
            "Failed to add questions to Google Form."
        )

        raise GoogleFormsClientError()


def form_edit_url(
    form_id: str,
) -> str:

    return (
        f"https://docs.google.com/forms/d/"
        f"{form_id}/edit"
    )


def form_responder_url(
    form_id: str,
) -> str:

    return (
        f"https://docs.google.com/forms/d/"
        f"{form_id}/viewform"
    )