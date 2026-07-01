import fitz

from exceptions.resume_exceptions import (
    ResumeParsingError,
)

from utils.logger import get_logger

logger = get_logger(__name__)


def extract_pdf_text(
    file_bytes: bytes,
) -> str:

    logger.info(
        "Extracting text from PDF."
    )

    try:

        document = fitz.open(
            stream=file_bytes,
            filetype="pdf",
        )

        text = ""

        for page in document:

            text += page.get_text()

        document.close()

        return text.strip()

    except Exception:

        logger.exception(
            "Failed to parse PDF."
        )

        raise ResumeParsingError()