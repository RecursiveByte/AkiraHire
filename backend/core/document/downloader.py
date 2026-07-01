import requests


from utils.logger import get_logger

from exceptions.resume_exceptions import (
    ResumeDownloadError,
)

logger = get_logger(__name__)


def download_document(
    resume_url: str,
) -> tuple[bytes, str]:

    logger.info(
        f"Downloading resume from {resume_url}"
    )

    try:

        response = requests.get(
            resume_url,
            timeout=30,
        )

        response.raise_for_status()

    except requests.RequestException:

        logger.exception(
            "Failed to download resume."
        )

        raise ResumeDownloadError()

    content_type = response.headers.get(
        "Content-Type",
        "",
    )

    return (
        response.content,
        content_type,
    )