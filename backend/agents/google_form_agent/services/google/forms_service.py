"""
Handles all Google Forms API operations: creating forms and adding questions.
"""

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


def build_form_service(creds):
    return build("forms", "v1", credentials=creds)


def create_form(service, title: str) -> str:
    """Creates an empty form with just a title. Returns the formId."""
    new_form = {"info": {"title": title,"documentTitle": title}}
    try:
        result = service.forms().create(body=new_form).execute()
        return result["formId"]
    except HttpError as e:
        raise RuntimeError(f"Failed to create form: {e}")


def add_questions(service, form_id: str, questions: list[dict]) -> None:
    batch_requests = []

    for idx, q in enumerate(questions):
        question_item = {"required": q.get("required", False)}

        if q["type"] == "TEXT":
            question_item["textQuestion"] = {"paragraph": q.get("paragraph", False)}
        elif q["type"] in ("RADIO", "CHECKBOX"):
            question_item["choiceQuestion"] = {
                "type": q["type"],
                "options": [{"value": opt} for opt in q["options"]],
            }
        elif q["type"] == "SCALE":
            question_item["scaleQuestion"] = {
                "low": q.get("low", 1),
                "high": q.get("high", 5),
            }
        else:
            raise ValueError(f"Unsupported question type: {q['type']}")

        batch_requests.append({
            "createItem": {
                "item": {
                    "title": q["title"],
                    "questionItem": {"question": question_item},
                },
                "location": {"index": idx},
            }
        })

    try:
        service.forms().batchUpdate(
            formId=form_id, body={"requests": batch_requests}
        ).execute()
    except HttpError as e:
        raise RuntimeError(f"Failed to add questions: {e}")


def form_edit_url(form_id: str) -> str:
    return f"https://docs.google.com/forms/d/{form_id}/edit"


def form_responder_url(form_id: str) -> str:
    return f"https://docs.google.com/forms/d/{form_id}/viewform"