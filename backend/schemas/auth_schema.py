from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
)

from enums.user_role_enum import UserRole

class UserResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    model_config = ConfigDict(
        from_attributes=True,
    )


class AuthResponse(BaseModel):

    access_token: str

    user: UserResponse


class RegisterRequest(BaseModel):

    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    email: EmailStr
    
    role:UserRole

    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
    )

    model_config = ConfigDict(
        str_strip_whitespace=True,
    )
    
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: UserRole