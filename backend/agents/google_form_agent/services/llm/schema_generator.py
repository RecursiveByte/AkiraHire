"""
Uses an LLM to convert a user's natural language description into a
structured JSON form schema.
"""

import json
from core.llm.llm_client import get_llm

SYSTEM_PROMPT = """You are a form schema generator. Given a user's description of a form,
output ONLY valid JSON (no markdown, no explanation, no backticks) matching this exact shape:

{
  "form_title": "string",
  "store_in_sheet": true,
  "questions": [
    {"title": "string", "type": "TEXT", "required": true, "paragraph": false},
    {"title": "string", "type": "RADIO", "options": ["A", "B"], "required": true},
    {"title": "string", "type": "CHECKBOX", "options": ["A", "B"], "required": true},
    {"title": "string", "type": "SCALE", "low": 1, "high": 5}
  ]
}

Rules:
- "type" must be one of: TEXT, RADIO, CHECKBOX, SCALE
- Only include fields relevant to that type
- Generate 3-6 reasonable questions based on the user's description
- Set "store_in_sheet" to true ONLY if the user explicitly mentions storing,
  saving, or sending responses to a Google Sheet / spreadsheet
  (phrases like "store in a sheet", "save to spreadsheet", "Google Sheets",
  "export to sheet"). Otherwise set it to false.
- Output ONLY the JSON object, nothing else
"""


def _clean_json_text(raw: str) -> str:
    raw = raw.strip()
    if raw.startswith("```"):
        raw = raw.strip("`")
        if raw.startswith("json"):
            raw = raw[4:]
    return raw.strip()


def generate_form_schema(user_description: str) -> dict:
    llm = get_llm()
    messages = [
        ("system", SYSTEM_PROMPT),
        ("human", user_description),
    ]
    response = llm.invoke(messages)
    raw = _clean_json_text(response.content)

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"LLM did not return valid JSON: {e}\nRaw output: {raw}")

    # Defensive defaults in case the LLM omits a field
    data.setdefault("store_in_sheet", False)
    data.setdefault("questions", [])

    return data


if __name__ == "__main__":
    description = input("Describe the form you want: ")
    schema = generate_form_schema(description)
    print(json.dumps(schema, indent=2))