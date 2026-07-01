def clean_json(
    raw: str,
) -> str:

    raw = raw.strip()

    if raw.startswith("```"):

        raw = raw.strip("`")

        if raw.startswith("json"):
            raw = raw[4:]

    return raw.strip()