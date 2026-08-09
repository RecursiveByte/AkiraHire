from datetime import datetime

from pydantic import BaseModel

class CreateCalendarEventRequest(BaseModel):
    title: str
    description: str | None = None

    start_time: datetime
    end_time: datetime

    create_google_meet: bool = False
    
    
class CreateCalendarEventResponse(BaseModel):
    event_id: str
    event_link: str
    google_meet_link: str | None