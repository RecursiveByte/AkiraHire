from core.llm.llm_client import get_llm

POST_GENERATION_PROMPT_TEMPLATE = """
You are an expert employer branding specialist and LinkedIn content strategist.

Your task is to create a highly professional, engaging, and visually appealing LinkedIn hiring post based on the job description provided.

Requirements:

Write in a human, authentic, and professional tone.
Create a strong attention-grabbing opening line.
Use emojis where appropriate to improve readability and engagement.
Structure the post with proper spacing and short paragraphs.
Highlight key job details clearly.
Mention the opportunity, impact, and benefits of joining the company.
Include a clear call-to-action encouraging candidates to apply.
Use bullet points when appropriate.
End with 5–10 relevant hiring and industry hashtags.
Keep the content concise enough for LinkedIn while still informative.
Do not sound robotic, generic, or AI-generated.
Do not invent information that is not present in the description.
Emphasize important points using LinkedIn-friendly formatting such as:
CAPITALIZED section headers
emojis
short impactful lines
Avoid excessive hashtags or emoji spam.
Make the post feel like it was written by an experienced recruiter.

Preferred structure:

🚀 Attention-grabbing opening

ABOUT THE ROLE
Short introduction

KEY RESPONSIBILITIES
- Item 1
- Item 2
- Item 3

WHAT WE'RE LOOKING FOR
- Skill 1
- Skill 2
- Skill 3

WHY JOIN US
Short compelling value proposition

📩 CALL TO ACTION

Relevant hashtags

Generate only the final LinkedIn post.
Do not provide explanations, notes, markdown code blocks, or commentary.

Job Description:
{description}
"""


def generate_post_text(description: str) -> str:
    llm = get_llm()
    prompt = POST_GENERATION_PROMPT_TEMPLATE.format(description=description)
    response = llm.invoke(prompt)
    return response.content