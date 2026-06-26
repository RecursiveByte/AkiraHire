

from pydantic import BaseModel

from agents.google_form_agent.schemas.question_schema import (
    QuestionSchema,
)


class GeneratedFormSchema(BaseModel):
    form_title: str

    store_in_sheet: bool = False

    questions: list[QuestionSchema] = []