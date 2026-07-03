from langgraph.checkpoint.postgres import PostgresSaver
from psycopg_pool import ConnectionPool

from config.settings import settings

connection_pool = ConnectionPool(
    conninfo=settings.DATABASE_URL,
    max_size=10,
    kwargs={"autocommit": True, "prepare_threshold": 0},
)

checkpointer = PostgresSaver(connection_pool)
checkpointer.setup()