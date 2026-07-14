from fastapi import Depends
from fastapi_limiter.depends import RateLimiter

DefaultRateLimit = Depends(
    RateLimiter(
        times=20,
        seconds=60,
    )
)