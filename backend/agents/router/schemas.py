from enum import Enum

from pydantic import BaseModel


class AgentType(str, Enum):
    JOB = "JOB"
    APPLICATION = "APPLICATION"
    GENERAL = "GENERAL"
    FORM = "FORM"
    GOOGLE_FORM = "GOOGLE_FORM"
    LINKEDIN = "LINKEDIN"
    EMAIL = "EMAIL"


class RouterResponse(BaseModel):
    agent: AgentType