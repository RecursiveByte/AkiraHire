from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr


class AuthResponse(BaseModel):
    access_token: str
    user: UserResponse