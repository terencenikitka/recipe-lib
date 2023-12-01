"""Fix relationship conflicts

Revision ID: 7c3b6ea681a5
Revises: 988487b6374e
Create Date: 2023-11-30 23:14:59.560583

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c3b6ea681a5'
down_revision = '988487b6374e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_date', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_column('created_date')

    # ### end Alembic commands ###
