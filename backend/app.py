from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from agents.google_form_agent.api.exception_handlers import register_exception_handlers


load_dotenv()

app = FastAPI(
    title="Google AutoForm API",
    version="1.0.0",
)

register_exception_handlers(app)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY")
)



app.mount("/static", StaticFiles(directory="static"), name="static")