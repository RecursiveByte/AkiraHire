import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
import time

from config.settings import settings

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=1800,
    pool_size=5,       
    max_overflow=10,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()
        
def wait_for_db(max_retries: int = 10, delay: int = 3):
    for attempt in range(1, max_retries + 1):
        try:
            with engine.connect():
                print("Database is ready.")
                return
        except OperationalError as e:
            print(f"DB not ready (attempt {attempt}/{max_retries}): {e}")
            time.sleep(delay)
    raise RuntimeError("Could not connect to the database after retries.")