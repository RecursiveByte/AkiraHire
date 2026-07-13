from app import app
from dotenv import load_dotenv

load_dotenv()

from integration.google_form.api.routes.google_form_routes import (
    router as google_autoform_router
)

from integration.linkedin.api.routes.linkedin_post_routes import (
    router as linkedin_router
)

from api.routes.auth_routes import (
    router as auth_router
)

from api.routes.candidate_routes import (router as candidate_router)

from api.routes.job_routes import (
    router as job_router,
)

from api.routes.form_routes import (
    router as form_router
)

from api.routes.chat_thread_routes import(
    router as chat_thread_router
)

from api.routes.application_routes import router as application_router
    
from api.routes.resume_routes import router as resume_router

from api.routes.application_evaluation_routes import router as application_evaluation_routes
from api.routes.chat_bot_router import router as chatbot_router


from integration.routes import router as integration_router

app.include_router(google_autoform_router)

app.include_router(linkedin_router)

app.include_router(auth_router)

app.include_router(candidate_router)

app.include_router(job_router)

app.include_router(form_router)

app.include_router(application_router)

app.include_router(resume_router)

app.include_router(application_evaluation_routes)

app.include_router(chatbot_router)
app.include_router(chat_thread_router)

app.include_router(integration_router)