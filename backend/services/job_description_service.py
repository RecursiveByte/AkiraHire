from core.llm.llm_client import (
    get_llm,
)

from prompts.job_description_prompt import (
    SYSTEM_PROMPT,
)

from schemas.job_schema import (
    GenerateJobDescriptionResponse,
)

from utils.logger import get_logger

logger = get_logger(__name__)


class JobDescriptionService:

    @staticmethod
    def generate_job_description(
        description: str,
    ) -> GenerateJobDescriptionResponse:

        logger.info(
            "Generating job description."
        )

        try:

            llm = get_llm()

            response = llm.invoke(
                [
                    (
                        "system",
                        SYSTEM_PROMPT,
                    ),
                    (
                        "user",
                        description,
                    ),
                ]
            )

            logger.info(
                "Job description generated successfully."
            )

            return GenerateJobDescriptionResponse(
                job_description=response.content.strip(),
            )

        except Exception:

            logger.exception(
                "Failed to generate job description."
            )

            raise