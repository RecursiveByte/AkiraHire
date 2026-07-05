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
    def generate_job_description(description: str) -> GenerateJobDescriptionResponse:
        logger.info("Generating job description.")

        try:
            llm = get_llm()
            structured_llm = llm.with_structured_output(GenerateJobDescriptionResponse)

            response = structured_llm.invoke(
                [
                    ("system", SYSTEM_PROMPT),
                    ("user", description),
                ]
            )

            logger.info("Job description generated successfully.")
            
            print("\n")
            
            print(response)
            print("\n")
            return response

        except Exception:
            logger.exception("Failed to generate job description.")
            raise