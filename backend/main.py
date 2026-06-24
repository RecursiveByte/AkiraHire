from app import app
from dotenv import load_dotenv

load_dotenv()

from agents.google_form_agent.api.routes.google_autoform_routes import (
    router as google_autoform_router
)

from agents.linkedin_agent.api.routes.linkedin_post_routes import (
    router as linkedin_router
)

from api.routes.auth_routes import (
    router as auth_router
)

app.include_router(google_autoform_router)
app.include_router(linkedin_router)
app.include_router(auth_router)