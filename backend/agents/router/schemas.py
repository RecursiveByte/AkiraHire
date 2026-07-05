from enum import Enum

from pydantic import BaseModel


class AgentType(str, Enum):
    JOB = "JOB"
    APPLICATION = "APPLICATION"
    GENERAL = "GENERAL"
    FORM = "FORM"


class RouterResponse(BaseModel):
    agent: AgentType