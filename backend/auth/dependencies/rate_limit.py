from fastapi import Depends
from fastapi_limiter.depends import RateLimiter

DefaultRateLimit = Depends(
    RateLimiter(
        times=2000000,
        seconds=60,
    )
)