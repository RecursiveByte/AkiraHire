from pydantic import BaseModel


class LinkedInPost(BaseModel):
    post: str
    
