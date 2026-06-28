from fastapi import FastAPI,Request
from starlette.middleware.sessions import SessionMiddleware
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from agents.google_form_agent.api.exception_handlers import register_exception_handlers
 
from fastapi.responses import JSONResponse

from exceptions.job_exceptions import JobException

load_dotenv()

app = FastAPI(
    title="Google AutoForm API",
    version="1.0.0",
)

# register_exception_handlers(app)
@app.exception_handler(JobException)
async def job_exception_handler(request: Request, exc: JobException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message},
    )

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY")
)

app.mount("/static", StaticFiles(directory="static"), name="static")