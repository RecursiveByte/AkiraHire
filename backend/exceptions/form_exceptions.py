class FormException(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.status_code = status_code
        super().__init__(message)

    @property
    def message(self):
        return str(self)
    
class InvalidFormSchemaError(FormException):
    def __init__(self):
        super().__init__(
            "LLM returned an invalid form schema.",
            422
        )


class FormAlreadyExistsError(FormException):
    def __init__(self):
        super().__init__(
            "A form already exists for this job.",
            409
        )


class FormNotFoundError(FormException):
    def __init__(self):
        super().__init__(
            "Form not found.",
            404
        )


class FormGenerationFailedError(FormException):
    def __init__(self):
        super().__init__(
            "Failed to generate the form schema.",
            500
        )


class FormAlreadyPublishedError(FormException):
    def __init__(self):
        super().__init__(
            "The form is already published.",
            409
        )


class FormCannotBeUpdatedError(FormException):
    def __init__(self):
        super().__init__(
            "Only draft forms can be updated.",
            400
        )


class FormAlreadyClosedError(FormException):
    def __init__(self):
        super().__init__(
            "The form is already closed.",
            409
        )


class FormCannotBeClosedError(FormException):
    def __init__(self):
        super().__init__(
            "Only open forms can be closed.",
            400
        )


class FormAlreadyCancelledError(FormException):
    def __init__(self):
        super().__init__(
            "The form is already cancelled.",
            409
        )


class FormCannotBeCancelledError(FormException):
    def __init__(self):
        super().__init__(
            "Closed forms cannot be cancelled.",
            400
        )