from fastapi import FastAPI, Request
from starlette.middleware.sessions import SessionMiddleware
import os
from dotenv import load_dotenv

from fastapi.responses import JSONResponse

from exceptions.base import AppException
from fastapi.middleware.cors import CORSMiddleware


from contextlib import asynccontextmanager

import redis.asyncio as redis

from fastapi_limiter import FastAPILimiter


from utils.logger import get_logger

logger = get_logger(__name__)

load_dotenv()

from config.settings import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    redis_client = redis.from_url(
        settings.REDIS_URL,
        decode_responses=True,
    )

    await FastAPILimiter.init(redis_client)

    logger.info("Redis rate limiter initialized.")

    yield

    await redis_client.close()

app = FastAPI(
    title="Google AutoForm API",
    version="1.0.0",
     lifespan=lifespan,
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
    allow_origins=[
        settings.FRONTEND_URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY
)