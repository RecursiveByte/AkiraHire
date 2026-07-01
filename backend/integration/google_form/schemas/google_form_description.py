from pydantic import BaseModel
from schemas.validators import DescriptionStr

class AutoFormRequest(BaseModel):
    description: DescriptionStr