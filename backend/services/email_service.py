import httpx

from config.settings import settings
from utils.logger import get_logger

logger = get_logger(__name__)

BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"


class EmailService:

    @staticmethod
    async def send_raw_email(to: str, subject: str, html_body: str) -> None:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                BREVO_API_URL,
                headers={
                    "api-key": settings.BREVO_API_KEY,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                json={
                    "sender": {
                        "name": settings.BREVO_SENDER_NAME,
                        "email": settings.BREVO_SENDER_EMAIL,
                    },
                    "to": [{"email": to}],
                    "subject": subject,
                    "htmlContent": html_body,
                },
            )

        if response.status_code >= 400:
            logger.error(f"Brevo send failed. to={to} status={response.status_code} body={response.text}")
            raise Exception(f"Brevo send failed: {response.status_code} {response.text}")

    @staticmethod
    async def send_otp_email(
        to: str,
        otp: str,
        expiry_minutes: int,
    ) -> None:
        logger.info(f"Sending OTP email. to={to}")

        body = (
            f"<p>Your OTP is <strong>{otp}</strong>.</p>"
            f"<p>It expires in {expiry_minutes} minutes.</p>"
            f"<p>If you did not request this, you can ignore this email.</p>"
        )

        await EmailService.send_raw_email(
            to=to,
            subject="Your AkiraHire password reset code",
            html_body=body,
        )

        logger.info(f"OTP email sent. to={to}")

    @staticmethod
    async def send_email(
        to: str,
        subject: str,
        body: str,
    ) -> None:
        logger.info(f"Sending email. to={to}")

        await EmailService.send_raw_email(
            to=to,
            subject=subject,
            html_body=body,
        )

        logger.info(f"Email sent. to={to}")

    @staticmethod
    async def send_bulk_email(
        recipients: list[dict],
        subject: str,
        body: str,
    ) -> list[str]:
        sent_to = []

        for recipient in recipients:
            await EmailService.send_email(
                to=recipient["email"],
                subject=subject,
                body=body.format(
                    candidate_name=recipient["full_name"],
                ),
            )
            sent_to.append(recipient["email"])

        logger.info(f"Bulk email sent. count={len(sent_to)}")

        return sent_to