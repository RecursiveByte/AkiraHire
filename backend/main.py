from app import app


from google_form_agent.api.routes.google_autoform_routes import (
    router as google_autoform_router
)

app.include_router(google_autoform_router)