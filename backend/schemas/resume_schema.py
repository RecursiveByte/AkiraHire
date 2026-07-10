from pydantic import BaseModel,HttpUrl
from datetime import datetime

class ReadResumeRequest(BaseModel):
    resume_url: HttpUrl

class ReadResumeResponse(BaseModel):
    content: str

class ResumeUploadResponse(BaseModel):
    document_url: str
    file_name: str
    updated_at: datetime