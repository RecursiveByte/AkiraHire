from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from agents.google_form_agent.exceptions.oauth_exceptions import (
    GoogleNotConnectedError,
    GoogleTokenRefreshError,
)
from agents.google_form_agent.exceptions.google_exceptions import (
    GoogleFormsClientError,
    GoogleSheetsClientError,
)


def register_exception_handlers(app: FastAPI):

    @app.exception_handler(GoogleNotConnectedError)
    async def google_not_connected(request: Request, exc: GoogleNotConnectedError):
        return JSONResponse(
            status_code=401,
            content={"message": str(exc)},
        )

    @app.exception_handler(GoogleTokenRefreshError)
    async def google_refresh_error(request: Request, exc: GoogleTokenRefreshError):
        return JSONResponse(
            status_code=401,
            content={"message": str(exc)},
        )

    @app.exception_handler(GoogleFormsClientError)
    async def google_forms_error(request: Request, exc: GoogleFormsClientError):
        return JSONResponse(
            status_code=500,
            content={"message": str(exc)},
        )

    @app.exception_handler(GoogleSheetsClientError)
    async def google_sheets_error(request: Request, exc: GoogleSheetsClientError):
        return JSONResponse(
            status_code=500,
            content={"message": str(exc)},
        )