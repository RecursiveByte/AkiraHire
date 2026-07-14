from typing import Annotated

from langchain_core.messages import ToolMessage
from langchain_core.tools import tool, InjectedToolCallId
from langgraph.types import Command

from integration.linkedin.services.llm.post_generator import (
    generate_post_text,
)


@tool
def generate_linkedin_post(
    description: str,
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    Generate a professional LinkedIn post draft, along with a short
    internal title, from the recruiter's description.

    Use this tool whenever the recruiter wants to:

    - Generate a LinkedIn post
    - Create a hiring announcement
    - Write a recruitment post
    - Improve or regenerate an existing LinkedIn post
    - Convert hiring information into a professional LinkedIn post

    The description may contain:
    - Job description
    - Hiring requirements
    - Company information
    - Existing draft
    - Additional recruiter instructions
    - Any other context provided by the recruiter

    This tool ONLY generates the LinkedIn post and its title.

    It DOES NOT:
    - publish the post
    - save the draft
    - modify LinkedIn
    - perform any external action
    """

    result = generate_post_text(description)

    return Command(
        update={
            "post_text": result["post_text"],
            "post_title": result["title"],
            "messages": [
                ToolMessage(
                    content="LinkedIn post generated successfully.",
                    tool_call_id=tool_call_id,
                )
            ],
        }
    )