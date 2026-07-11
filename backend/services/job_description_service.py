from core.llm.llm_client import (
    get_llm,
)

from prompts.job_description_prompt import get_system_prompt

from schemas.job_schema import (
    GenerateJobDescriptionResponse,
)

from utils.logger import get_logger

from core.llm.llm_client import safe_invoke

logger = get_logger(__name__)


class JobDescriptionService:

    @staticmethod
    def generate_job_description(description: str) -> GenerateJobDescriptionResponse:
        logger.info("Generating job description.")

        try:
            llm = get_llm()
            structured_llm = llm.with_structured_output(GenerateJobDescriptionResponse)

            system_prompt = get_system_prompt()
            response = safe_invoke(
                structured_llm,
                [
                    ("system", system_prompt),
                    ("user", description),
                ],
            )

            print("=" * 10)
            print(response)
            print("=" * 10)

            logger.info("Job description generated successfully.")

            print("\n")

            print(response)
            print("\n")
            return response

        except Exception:
            logger.exception("Failed to generate job description.")
            raise
