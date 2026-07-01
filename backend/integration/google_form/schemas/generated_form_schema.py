

from pydantic import BaseModel

from integration.google_form.schemas.question_schema import (
    QuestionSchema,
)


class GeneratedFormSchema(BaseModel):
    form_title: str

    store_in_sheet: bool = False

    questions: list[QuestionSchema] = []