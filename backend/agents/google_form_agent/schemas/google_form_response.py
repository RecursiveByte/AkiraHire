from pydantic import BaseModel


class GoogleFormResponse(BaseModel):
    form_edit_url: str
    form_responder_url: str
    response_sheet_url: str | None = None