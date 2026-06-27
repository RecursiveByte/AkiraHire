from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    LINKEDIN_CLIENT_ID: str
    LINKEDIN_CLIENT_SECRET: str
    LINKEDIN_REDIRECT_URI: str

settings = Settings()