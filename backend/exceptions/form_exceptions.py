from fastapi import status
from exceptions.base import AppException

class FormException(AppException):
    pass


class InvalidFormSchemaError(FormException):
    def __init__(self):
        super().__init__(
            message="LLM returned an invalid form schema.",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )


class FormAlreadyExistsError(FormException):
    def __init__(self):
        super().__init__(
            message="A form already exists for this job.",
            status_code=status.HTTP_409_CONFLICT,
        )


class FormNotFoundError(FormException):
    def __init__(self):
        super().__init__(
            message="Form not found.",
            status_code=status.HTTP_404_NOT_FOUND,
        )


class FormGenerationFailedError(FormException):
    def __init__(self):
        super().__init__(
            message="Failed to generate the form schema.",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


class FormAlreadyPublishedError(FormException):
    def __init__(self):
        super().__init__(
            message="The form is already published.",
            status_code=status.HTTP_409_CONFLICT,
        )



class FormAlreadyClosedError(FormException):
    def __init__(self):
        super().__init__(
            message="The form is already closed.",
            status_code=status.HTTP_409_CONFLICT,
        )


class FormCannotBeClosedError(FormException):
    def __init__(self):
        super().__init__(
            message="Only open forms can be closed.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )