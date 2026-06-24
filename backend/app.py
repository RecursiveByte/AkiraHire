from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Google AutoForm API",
    version="1.0.0",
)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY")
)