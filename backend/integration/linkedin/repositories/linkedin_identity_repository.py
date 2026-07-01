from sqlalchemy.orm import Session

from database.models.linkedin_identity import LinkedInIdentity


def get_by_connected_account_id(
    db: Session, connected_account_id: int
) -> LinkedInIdentity | None:
    return (
        db.query(LinkedInIdentity)
        .filter(LinkedInIdentity.connected_account_id == connected_account_id)
        .first()
    )


def upsert_identity(
    db: Session, connected_account_id: int, person_urn: str
) -> LinkedInIdentity:
    identity = get_by_connected_account_id(db, connected_account_id)

    if identity is None:
        identity = LinkedInIdentity(
            connected_account_id=connected_account_id,
            person_urn=person_urn,
        )
        db.add(identity)
    else:
        identity.person_urn = person_urn

    db.commit()
    db.refresh(identity)
    return identity