from fastapi import status

from exceptions.base import AppException


class LLMError(AppException):
    pass

class LLMGenerationError(LLMError):
    def __init__(self, message: str = "Failed to generate content using the language model."):
        super().__init__(
            message=message,
            status_code=status.HTTP_502_BAD_GATEWAY,
        )

class InvalidLLMResponseError(
    LLMError,
):

    def __init__(self):
        super().__init__(
            message="The language model returned an invalid response.",
            status_code=status.HTTP_502_BAD_GATEWAY,
        )