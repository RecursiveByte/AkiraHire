from pydantic import BaseModel, EmailStr


class RecruiterListResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    model_config = {
        "from_attributes": True,
    }


class DeleteRecruiterResponse(BaseModel):
    message: str