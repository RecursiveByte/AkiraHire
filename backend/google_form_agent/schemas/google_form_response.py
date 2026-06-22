from pydantic import BaseModel


class GoogleFormResponse(BaseModel):
    form_edit_url: str
    form_responder_url: str
    sheet_url: str | None = None