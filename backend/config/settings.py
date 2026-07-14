from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    DATABASE_URL: str

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    
    GOOGLE_LOGIN_CALLBACK_URI:str
    GOOGLE_FORM_CALLBACK_URI: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int

    LINKEDIN_CLIENT_ID: str
    LINKEDIN_CLIENT_SECRET: str
    LINKEDIN_REDIRECT_URI: str

    COOKIE_SECURE: bool
    COOKIE_SAMESITE: str

    FRONTEND_URL: str
    BACKEND_URL: str

    SUPABASE_URL: str
    SUPABASE_KEY: str

    SECRET_KEY: str

    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_FROM_NAME: str = "AkiraHire"

    GROQ_API_KEY: str
    MODEL_NAME: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()
