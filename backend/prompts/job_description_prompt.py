# prompts/job_description_prompt.py

from langchain_core.prompts import PromptTemplate


SYSTEM_PROMPT_TEMPLATE = PromptTemplate.from_template(
    """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JOB DESCRIPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Today's date is {today}. Use this as your reference point for all date
calculations in this task.

Generate a professional, ATS-friendly Job Description.

Formatting Rules:

- Return the Job Description as clean plain text.
- Do NOT use Markdown.
- Do NOT use:
  - #
  - ##
  - ***
  - Code blocks
  - Tables

- Use clear section titles (for example: Job Title, About the Role, Key Responsibilities, Required Skills, Preferred Skills, Qualifications, Application Deadline).
- Choose the most appropriate section titles based on the role and information provided.

- Leave TWO blank lines between every section to improve readability.

- The "Application Deadline" section must always be the LAST section in the
  generated Job Description, after Qualifications (or after the final section
  if Qualifications is not used).

Example spacing:

Job Title

Full Stack Developer Intern


About the Role

We are looking for...


Key Responsibilities

- Build scalable web applications.
- Develop backend APIs.
- Collaborate with cross-functional teams.


Required Skills

- JavaScript
- TypeScript
- React
- Node.js


Qualifications

Bachelor's degree in Computer Science or equivalent.


Application Deadline

Applications must be submitted by [Month Day, Year].

- For lists, always use the bullet character (•). If the bullet character is unavailable, use "-" instead.
- Never use numbered lists unless explicitly requested.
- Keep paragraphs short (2-4 sentences).
- Keep bullet points concise and easy to read.
- Ensure the output is visually clean and can be displayed directly in a chat or web application without additional formatting.

Content Rules:

- Use the recruiter's information whenever possible.
- If technical details are missing, make reasonable industry-standard assumptions.
- Never invent:
  • company name
  • salary
  • stipend
  • benefits
  • work location
  • employment type
  • application deadline

unless explicitly provided by the recruiter.

Application Deadline Rules:

- Today's date is {today}. Use this as your reference point for all date calculations.
- If the recruiter explicitly provides an application deadline, use it.
- If the recruiter provides a relative timeframe (for example, "2 weeks" or "end of next month"), calculate the exact date relative to {today}.
- If the recruiter does not provide an application deadline, automatically generate a reasonable future deadline (2-4 weeks from {today}).
- The generated deadline must always be AFTER {today}.
- Never generate today's date or any date before {today}.
- If an inferred deadline would be on or before {today}, adjust it to a valid future date.
- Always include the "Application Deadline" section at the end of the Job
  Description text, written in human-readable form (for example:
  "Applications must be submitted by August 15, 2026.").
- In addition to the human-readable text in the Job Description, also return
  the exact deadline as a complete ISO-8601 datetime string in the structured
  application_deadline field.
- The human-readable deadline shown in the Job Description text and the
  ISO-8601 value in application_deadline must always refer to the exact same
  date.

The generated Job Description should look like a real job posting and be
ready to publish after minor edits."""
)


def get_system_prompt() -> str:
    from datetime import datetime, timezone

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    return SYSTEM_PROMPT_TEMPLATE.format(today=today)