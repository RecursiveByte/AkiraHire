from sqlalchemy.orm import Session
from datetime import datetime, timezone

from database.models.password_reset_otp import PasswordResetOTP


class PasswordResetRepository:

    @staticmethod
    def create(
        db: Session,
        user_id: int,
        otp_hash: str,
        expires_at: datetime,
    ) -> PasswordResetOTP:
        record = PasswordResetOTP(
            user_id=user_id,
            otp_hash=otp_hash,
            expires_at=expires_at,
        )
        db.add(record)
        db.commit()
        db.refresh(record)
        return record

    @staticmethod
    def get_latest_valid(db: Session, user_id: int) -> PasswordResetOTP | None:
        return (
            db.query(PasswordResetOTP)
            .filter(
                PasswordResetOTP.user_id == user_id,
                PasswordResetOTP.is_used.is_(False),
                PasswordResetOTP.expires_at > datetime.now(timezone.utc),
            )
            .order_by(PasswordResetOTP.created_at.desc())
            .first()
        )

    @staticmethod
    def mark_used(db: Session, record: PasswordResetOTP) -> None:
        record.is_used = True
        db.commit()