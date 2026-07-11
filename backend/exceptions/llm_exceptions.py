from exceptions.base import AppException


class LLMRateLimitError(AppException):
    def __init__(self):
        super().__init__(
            message="I'm currently experiencing high demand and have hit a temporary usage limit. Please try again in a minute.",
            status_code=429,
        )