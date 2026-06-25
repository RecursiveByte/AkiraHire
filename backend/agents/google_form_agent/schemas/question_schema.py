"""
Schemas representing supported Google Form question types.
"""

from typing import Literal

from pydantic import BaseModel


class QuestionSchema(BaseModel):
    title: str

    type: Literal[
        "TEXT",
        "RADIO",
        "CHECKBOX",
        "SCALE",
    ]

    required: bool = False

    paragraph: bool = False

    options: list[str] = []

    low: int = 1

    high: int = 5