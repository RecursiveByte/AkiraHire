"""
Exceptions related to LLM operations.
"""


class LLMError(Exception):
    """Base exception for all LLM operations."""
    pass


class InvalidLLMResponseError(LLMError):
    """Raised when the LLM returns invalid or malformed data."""
    pass