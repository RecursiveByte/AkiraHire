from passlib.context import CryptContext

from config.settings import settings
from database.session import SessionLocal
from database.models.user import User


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def change_admin_password() -> None:
    db = SessionLocal()

    try:
        admin = (
            db.query(User)
            .filter(
                User.id == 24,
                User.email == "admin@akirahire.com",
                User.role == "ADMIN",
            )
            .first()
        )

        if admin is None:
            raise RuntimeError(
                "Admin user not found."
            )

        admin.password_hash = pwd_context.hash(
            settings.ADMIN_PASSWORD
        )

        db.commit()

        print("Admin password changed successfully.")
        print(f"Admin email: {admin.email}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    change_admin_password()
