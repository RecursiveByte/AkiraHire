"""add cascade delete for linkedin identity relationship

Revision ID: ce6f3e128f09
Revises: 23c8af5106db
Create Date: 2026-07-14 01:21:27.795345

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ce6f3e128f09'
down_revision: Union[str, Sequence[str], None] = '23c8af5106db'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
