from pydantic import BaseModel
from typing import Optional

class IntegrationResponse(BaseModel):
    id: Optional[int] = None
    name: str
    provider: str
    connected: bool