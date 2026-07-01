from core.document.downloader import (
    download_document,
)

from core.document.readers.pdf_reader import (
    extract_pdf_text,
)


from exceptions.resume_exceptions import (
    UnsupportedResumeFormatError,
)

from utils.logger import get_logger

logger = get_logger(__name__)


class ResumeService:

    @staticmethod

    def read_resume(
        resume_url: str,
    ) -> str:

        logger.info(
            "Reading resume."
        )

        file_bytes, content_type = (
            download_document(
                resume_url=resume_url,
            )
        )

        if (
            content_type == "application/pdf"
            or resume_url.lower().endswith(".pdf")
        ):

            return extract_pdf_text(
                file_bytes=file_bytes,
            )

        # if (
            # content_type
            # == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            # or resume_url.lower().endswith(".docx")
        # ):

            # return extract_docx_text(
                # file_bytes=file_bytes,
            # )

        logger.warning(
            f"Unsupported resume format. "
            f"content_type={content_type}"
        )

        raise UnsupportedResumeFormatError()