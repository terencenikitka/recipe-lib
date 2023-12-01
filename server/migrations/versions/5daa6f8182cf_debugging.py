"""debugging

Revision ID: 5daa6f8182cf
Revises: 98456e5df599
Create Date: 2023-11-30 15:04:15.847736

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5daa6f8182cf'
down_revision = '98456e5df599'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.create_foreign_key(batch_op.f('fk_comments_chef_id_chefs'), 'chefs', ['chef_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_comments_recipe_id_recipes'), 'recipes', ['recipe_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_comments_recipe_id_recipes'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_comments_chef_id_chefs'), type_='foreignkey')

    # ### end Alembic commands ###
