"""debugging

Revision ID: a5e52e9abdb1
Revises: 04072acebde3
Create Date: 2023-11-30 11:36:59.957624

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a5e52e9abdb1'
down_revision = '04072acebde3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_column('created_date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_date', sa.DATETIME(), nullable=True))

    # ### end Alembic commands ###