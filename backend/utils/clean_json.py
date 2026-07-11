
import re


def clean_json(
    raw: str,
) -> str:

    raw = raw.strip()

    if raw.startswith("```"):

        raw = raw.strip("`")

        if raw.startswith("json"):
            raw = raw[4:]

    raw = raw.strip()

    def _escape_control_chars(match: re.Match) -> str:
        char = match.group(0)
        return {
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
        }.get(char, "")

    raw = re.sub(r"[\x00-\x1f]", _escape_control_chars, raw)

    return raw