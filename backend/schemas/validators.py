from typing import Annotated
from pydantic import AfterValidator
import phonenumbers

def validate_str(value: str) -> str:
    cleaned = value.strip()
    if len(cleaned) < 10:
        raise ValueError("Description too short")
    return cleaned

DescriptionStr = Annotated[str, AfterValidator(validate_str)]


def validate_and_normalize_phone(v: str) -> str:
    if not v.startswith("+"):
        raise ValueError("Phone number must include country code (e.g. +919876543210)")
    try:
        parsed = phonenumbers.parse(v)
        if not phonenumbers.is_valid_number(parsed):
            raise ValueError("Invalid phone number for the given country code")
    except phonenumbers.NumberParseException:
        raise ValueError("Invalid phone number format")
    return phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)

PhoneNumber = Annotated[str, AfterValidator(validate_and_normalize_phone)]