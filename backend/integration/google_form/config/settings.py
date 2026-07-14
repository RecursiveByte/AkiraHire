from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)


class Settings(
    BaseSettings,
):

    GOOGLE_CLIENT_ID: str

    GOOGLE_CLIENT_SECRET: str

    GOOGLE_FORM_CALLBACK_URI: str
    GOOGLE_LOGIN_CALLBACK_URI:str

    FRONTEND_URL: str

    APPS_SCRIPT_ID: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()