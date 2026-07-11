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

# from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver
# from psycopg_pool import AsyncConnectionPool

# from config.settings import settings

# connection_pool: AsyncConnectionPool | None = None
# checkpointer: AsyncPostgresSaver | None = None


# async def init_checkpointer() -> AsyncPostgresSaver:
#     global connection_pool, checkpointer

#     connection_pool = AsyncConnectionPool(
#         conninfo=settings.DATABASE_URL,
#         max_size=10,
#         kwargs={"autocommit": True, "prepare_threshold": 0},
#         open=False,
#     )

#     await connection_pool.open()

#     checkpointer = AsyncPostgresSaver(connection_pool)
#     await checkpointer.setup()

#     return checkpointer


# async def close_checkpointer():
#     if connection_pool:
#         await connection_pool.close()


# def get_checkpointer() -> AsyncPostgresSaver:
#     if checkpointer is None:
#         raise RuntimeError("Checkpointer not initialized. Call init_checkpointer() first.")
#     return checkpointer


