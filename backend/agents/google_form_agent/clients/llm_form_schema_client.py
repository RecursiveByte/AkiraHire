"""
LLM client responsible for generating a structured
Google Form schema.
"""

import logging

from core.llm.llm_client import get_llm

from agents.google_form_agent.prompts.form_schema_prompt import (
    SYSTEM_PROMPT,
)

from agents.google_form_agent.schemas.generated_form_schema import (
    GeneratedFormSchema,
)

from agents.google_form_agent.exceptions.llm_exceptions import (
    InvalidLLMResponseError,
)

logger = logging.getLogger(__name__)


def _clean_json(raw: str) -> str:
    """
    Remove markdown code fences from the LLM response.
    """

    raw = raw.strip()

    if raw.startswith("```"):

        raw = raw.strip("`")

        if raw.startswith("json"):
            raw = raw[4:]

    return raw.strip()


def generate_form_schema(
    description: str,
) -> GeneratedFormSchema:
    """
    Generate a Google Form schema from a natural language
    description.
    """

    llm = get_llm()

    response = llm.invoke(
        [
            (
                "system",
                SYSTEM_PROMPT,
            ),
            (
                "human",
                description,
            ),
        ]
    )

    cleaned = _clean_json(response.content)

    try:

        return GeneratedFormSchema.model_validate_json(
            cleaned
        )

    except Exception as e:

        logger.exception(
            "LLM returned an invalid schema."
        )

        raise InvalidLLMResponseError(
            "LLM returned invalid JSON."
        ) from e