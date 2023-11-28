"""create password

Revision ID: 3e2c5bb3bd31
Revises: c7eebace6430
Create Date: 2023-11-28 10:37:16.182356

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3e2c5bb3bd31'
down_revision = 'c7eebace6430'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('chefs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('chefs', schema=None) as batch_op:
        batch_op.drop_column('password')

    # ### end Alembic commands ###
