"""
LLM service responsible for generating a validated
application form schema.
"""

import logging

from core.llm.llm_client import get_llm

from prompts.dynamic_form_prompt import (
    SYSTEM_PROMPT,
)

from schemas.form_schema import (
    GeneratedFormSchemaResponse
)

from exceptions.form_exceptions import (
    InvalidFormSchemaError
)

logger = logging.getLogger(__name__)


class FormSchemaService:

    @staticmethod
    def _clean_llm_response(
        raw: str,
    ) -> str:

        raw = raw.strip()

        if raw.startswith("```"):

            raw = raw.strip("`")

            if raw.startswith("json"):
                raw = raw[4:]

        return raw.strip()

    @staticmethod
    def generate_form_schema(
        description: str,
    ) -> GeneratedFormSchemaResponse:


        logger.info(
            "Generating form schema."
        )

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

        cleaned_response = (
            FormSchemaService._clean_llm_response(
                response.content,
            )
        )

        try:

            generated_schema = (
                GeneratedFormSchemaResponse.model_validate_json(
                    cleaned_response,
                )
            )

            logger.info(
                "Form schema generated successfully."
            )

            return generated_schema

        except Exception:

            logger.exception(
                "LLM returned an invalid form schema."
            )

            raise InvalidFormSchemaError()