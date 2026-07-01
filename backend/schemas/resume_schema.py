from pydantic import BaseModel,HttpUrl

class ReadResumeRequest(BaseModel):
    resume_url: HttpUrl


class ReadResumeResponse(BaseModel):
    content: str