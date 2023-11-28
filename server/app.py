#!/usr/bin/env python3

# Standard library imports
import os
# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource



# Local imports
from config import app, db, api

from models import Cuisine,Ingredient,RecipeCuisine,RecipeIngredient,Recipe,Chef,Comment


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False



class Cuisines (Resource):

    def get(self):
        all_cuisines = Cuisine.query.all()
        cuisine_data = [cuisine.to_dict(rules=('-recipe_cuisines',))for cuisine in all_cuisines]
        return make_response(cuisine_data,200)
        
api.add_resource(Cuisines, '/cuisines')        


class Ingredients (Resource):

    def get(self):
        all_ingredients = Ingredient.query.all()
        ingredient_data = [ingredient.to_dict(rules=('-recipe_ingredients',))for ingredient in all_ingredients]
        return make_response(ingredient_data,200)
        
api.add_resource(Ingredients, '/ingredients')


class RecipeCuisines (Resource):
    
    def get(self):
        all_RecipeCuisine=RecipeCuisine.query.all()
        RecipeCuisine_data = [recipe_cuisine.to_dict(rules=('-recipe','cuisine')) for recipe_cuisine in all_RecipeCuisine]
        return make_response(RecipeCuisine_data,200)

api.add_resource(RecipeCuisines,'/recipe_cuisines')


class RecipeIngredients (Resource):

    def get(self):
        all_RecipeIngredient = RecipeIngredient.query.all()
        RecipeIngredient_data = [recipe_ingredient.to_dict(rules=('-recipe','-ingredient'))for recipe_ingredient in all_RecipeIngredient]
        return make_response(RecipeIngredient_data,200)

api.add_resource(RecipeIngredients,'/recipe_ingredients')        



class Recipes (Resource):

    def get(self):
        all_recipes = Recipe.query.all()
        recipe_data = [recipe.to_dict(rules = ('-chef','-comments','-recipe_ingredients','-recipe_cuisines')) for recipe in all_recipes]
        return make_response(recipe_data,200)

api.add_resource(Recipes,'/recipes')        


class Chefs (Resource):

     def get(self):
        all_chefs = Chef.query.all()
        chefs_data = [chef.to_dict(rules=('-comments', '-recipes')) for chef in all_chefs]
        return make_response(chefs_data, 200)

api.add_resource(Chefs,'/chefs')


class Comments (Resource):

    def get(self):
        all_comments = Comment.query.all()
        comment_data = [comment.to_dict(rules = ('-chef','-recipe')) for comment in all_comments]
        return make_response(comment_data,200)

api.add_resource(Comments,'/comments')        




@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

