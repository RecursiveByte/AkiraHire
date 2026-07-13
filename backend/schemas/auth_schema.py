from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator
)

from enums.user_role_enum import UserRole

from enum import Enum

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


class SelfSignupRole(str, Enum):
    RECRUITER = "recruiter"
    CANDIDATE = "candidate"

class RegisterRequest(BaseModel):

    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    email: EmailStr
    
    role: SelfSignupRole

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
        
class CurrentUser(BaseModel):
    user_id: int
    role: UserRole
    email: EmailStr
    type: str
    
class CurrentUserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str
    new_password: str
    confirm_password: str

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, v, info):
        if "new_password" in info.data and v != info.data["new_password"]:
            raise ValueError("Passwords do not match.")
        return v