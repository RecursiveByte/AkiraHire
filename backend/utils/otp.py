import secrets
import hashlib


def generate_otp() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"


def hash_otp(otp: str) -> str:
    return hashlib.sha256(otp.encode()).hexdigest()


def verify_otp(otp: str, otp_hash: str) -> bool:
    return hash_otp(otp) == otp_hash