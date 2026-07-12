from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

from config.settings import settings
from utils.logger import get_logger

logger = get_logger(__name__)

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)


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

        fm = FastMail(conf)
        await fm.send_message(message)

        logger.info(f"OTP email sent. to={to}")