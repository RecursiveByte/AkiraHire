from pydantic import BaseModel, Field

from core.llm.llm_client import get_llm
from integration.linkedin.prompts.prompts import POST_GENERATION_PROMPT_TEMPLATE


class LinkedInPostOutput(BaseModel):
    title: str = Field(
        description=(
            "Short internal title for the draft, under 8 words, "
            "no emojis or hashtags, identifying the role and company."
        )
    )
    post_text: str = Field(
        description="The full LinkedIn hiring post content."
    )


def generate_post_text(description: str) -> dict:
    llm = get_llm().with_structured_output(LinkedInPostOutput)

    prompt = POST_GENERATION_PROMPT_TEMPLATE.format(description=description)

    response = llm.invoke(prompt)

    return {
        "title": response.title,
        "post_text": response.post_text,
    }