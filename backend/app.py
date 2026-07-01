from fastapi import FastAPI,Request
from starlette.middleware.sessions import SessionMiddleware
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
 
from fastapi.responses import JSONResponse

from exceptions.job_exceptions import JobException
from exceptions.base import AppException
from fastapi.middleware.cors import CORSMiddleware

from utils.logger import get_logger

logger = get_logger(__name__)

load_dotenv()

app = FastAPI(
    title="Google AutoForm API",
    version="1.0.0",
)

@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message},
    )
    
@app.exception_handler(Exception)
async def exception_handler(
    request: Request,
    exc: Exception,
):
    logger.exception(exc)

    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal Server Error",
        },
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY")
)


app.mount("/static", StaticFiles(directory="static"), name="static")