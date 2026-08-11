from fastapi_mail import FastMail, MessageSchema, MessageType

from core.mail.mail_client import mail_conf
from utils.logger import get_logger

logger = get_logger(__name__)


class EmailService:

    @staticmethod
    async def send_otp_email(
        to: str,
        otp: str,
        expiry_minutes: int,
    ) -> None:
        logger.info(f"Sending OTP email. to={to}")

        message = MessageSchema(
            subject="Your AkiraHire password reset code",
            recipients=[to],
            body=(
                f"<p>Your OTP is <strong>{otp}</strong>.</p>"
                f"<p>It expires in {expiry_minutes} minutes.</p>"
                f"<p>If you did not request this, you can ignore this email.</p>"
            ),
            subtype=MessageType.html,
        )

        fm = FastMail(mail_conf)
        await fm.send_message(message)

        logger.info(f"OTP email sent. to={to}")

    @staticmethod
    async def send_email(
        to: str,
        subject: str,
        body: str,
    ) -> None:
        logger.info(f"Sending email. to={to}")

        message = MessageSchema(
            subject=subject,
            recipients=[to],
            body=body,
            subtype=MessageType.html,
        )

        fm = FastMail(mail_conf)
        await fm.send_message(message)

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