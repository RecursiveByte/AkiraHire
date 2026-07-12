from fastapi import status

from exceptions.base import AppException


class ChatThreadException(AppException):
    pass


class ChatThreadNotFoundError(ChatThreadException):
    status_code = status.HTTP_404_NOT_FOUND
    message = "Chat thread not found."