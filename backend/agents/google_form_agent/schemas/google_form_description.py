from pydantic import BaseModel, field_validator

class AutoFormRequest(BaseModel):
    description: str

    @field_validator("description")
    @classmethod
    def validate_description(cls, value):
        if len(value.strip()) < 10:
            raise ValueError("Description too short")
        return value