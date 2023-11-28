from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, SQLAlchemy, MetaData

class Cuisine(db.Model, SerializerMixin):
    __tablename__ = 'cuisines'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    recipe_cuisines = db.relationship('RecipeCuisine', back_populates='cuisine')

class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='ingredient')

class RecipeCuisine(db.Model, SerializerMixin):
    __tablename__ = 'recipe_cuisines'

    id = db.Column(db.Integer, primary_key=True)

    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    cuisine_id = db.Column(db.Integer, db.ForeignKey('cuisines.id'))

    recipe = db.relationship('Recipe', back_populates='recipe_cuisines')
    cuisine = db.relationship('Cuisine', back_populates='recipe_cuisines')

class RecipeIngredient(db.Model, SerializerMixin):
    __tablename__ = 'recipe_ingredients'

    id = db.Column(db.Integer, primary_key=True)

    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))

    recipe = db.relationship('Recipe', back_populates='recipe_ingredients')
    ingredient = db.relationship('Ingredient', back_populates='recipe_ingredients')

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    created_date = db.Column(db.DateTime)
    difficulty = db.Column(db.String)
    cook_time = db.Column(db.Integer)
    instruction = db.Column(db.String)

    chef_id = db.Column(db.Integer, db.ForeignKey('chefs.id'))   

    chef = db.relationship('Chef', back_populates='recipes')
    comments = db.relationship('Comment', back_populates='recipe')
    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='recipe')
    recipe_cuisines = db.relationship('RecipeCuisine', back_populates='recipe')

class Chef(db.Model, SerializerMixin):
    __tablename__ = 'chefs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    pic = db.Column(db.String)

    comments = db.relationship('Comment', back_populates='chef')
    recipes = db.relationship('Recipe', back_populates='chef')

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String)
    created_date = db.Column(db.DateTime)

    chef_id = db.Column(db.Integer, db.ForeignKey('chefs.id'))    
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    chef = db.relationship('Chef', back_populates='comments')
    recipe = db.relationship('Recipe', back_populates='comments')
