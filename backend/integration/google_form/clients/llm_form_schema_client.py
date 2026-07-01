"""
LLM client responsible for generating a structured
Google Form schema.
"""

from core.llm.llm_client import (
    get_llm,
)

from integration.google_form.prompts.form_schema_prompt import (
    SYSTEM_PROMPT,
)

from integration.google_form.schemas.generated_form_schema import (
    GeneratedFormSchema,
)

from integration.google_form.exceptions.llm_exceptions import (
    InvalidLLMResponseError,
    LLMGenerationError,
)

from utils.logger import get_logger

logger = get_logger(__name__)


def _clean_json(
    raw: str,
) -> str:

    raw = raw.strip()

    if raw.startswith("```"):

        raw = raw.strip("`")

        if raw.startswith("json"):

            raw = raw[4:]

    return raw.strip()


def generate_form_schema(
    description: str,
) -> GeneratedFormSchema:

    try:

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

    except Exception:

        logger.exception(
            "Failed to generate form schema using the LLM."
        )

        raise LLMGenerationError()

    cleaned = _clean_json(
        response.content,
    )

    try:

        return (
            GeneratedFormSchema.model_validate_json(
                cleaned,
            )
        )

    except Exception:

        logger.exception(
            "LLM returned an invalid form schema."
        )

        raise InvalidLLMResponseError()