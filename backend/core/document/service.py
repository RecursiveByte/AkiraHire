import uuid

from fastapi import UploadFile

from core.document.downloader import (
    download_document,
)

from core.document.readers.pdf_reader import (
    extract_pdf_text,
)

from core.storage.supabase_client import supabase_client

from exceptions.resume_exceptions import (
    UnsupportedResumeFormatError,
    ResumeUploadError
    
)

from utils.logger import get_logger

logger = get_logger(__name__)

from config.constants import RESUME_BUCKET

class ResumeService:

    @staticmethod
    def read_resume(
        resume_url: str,
    ) -> str:

        logger.info("Reading resume.")

        file_bytes, content_type = download_document(
            resume_url=resume_url,
        )

        if content_type == "application/pdf" or resume_url.lower().endswith(".pdf"):

            return extract_pdf_text(
                file_bytes=file_bytes,
            )

        logger.warning(f"Unsupported resume format. " f"content_type={content_type}")

        raise UnsupportedResumeFormatError()

    @staticmethod
    def upload_resume(
        file: UploadFile,
    ) -> str:

        logger.info("Uploading resume.")

        file_extension = file.filename.split(".")[-1]

        file_path = f"{uuid.uuid4()}.{file_extension}"

        file_bytes = file.file.read()

        try:
            supabase_client.storage.from_(RESUME_BUCKET).upload(
                path=file_path,
                file=file_bytes,
                file_options={
                    "content-type": file.content_type,
                },
            )
        except Exception as error:
            logger.warning(f"Resume upload failed. error={error}")
            raise ResumeUploadError()

        public_url = supabase_client.storage.from_(RESUME_BUCKET).get_public_url(
            file_path
        )

        return public_url
