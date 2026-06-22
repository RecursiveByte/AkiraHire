from fastapi import APIRouter
from google_form_agent.orchestrators.google_autoform import run_autoform_pipeline
from google_form_agent.schemas.google_form_description import (
    AutoFormRequest,
)
from google_form_agent.schemas.google_form_response import (
    GoogleFormResponse,
)

router = APIRouter(
    prefix="/google-autoform",
    tags=["Google AutoForm"],
)

@router.post(
    "/create_google_form",
    response_model=GoogleFormResponse
)
async def create_google_form(request: AutoFormRequest):
    return run_autoform_pipeline(request.description)