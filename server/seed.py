#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db,Chef,Comment,Recipe,RecipeIngredient,RecipeCuisine,Ingredient,Cuisine

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        #delete Existing
        Comment.query.delete()
        Chef.query.delete()
        Recipe.query.delete()
        RecipeIngredient.query.delete()
        RecipeCuisine.query.delete()
        Ingredient.query.delete()
        Cuisine.query.delete()
        #adding chefs
        c1 = Chef(name="Peyton",bio="SomeIntrestingBio",pic="SomePicUrl",password = '123')
        c2 = Chef(name="Nikita",bio="SomeIntrestingBio",pic="SomePicUrl", password = 'ss') 
        c3 = Chef(name="Mateusz",bio="SomeIntrestingBio",pic="SomePicUrl")
        db.session.add_all([c1,c2,c3])
        db.session.commit()
        #adding Recipes
        
        #adding Cuisines
        #adding Recipe_cuisine
        #adding Ingredients
        #adding Recipe_ingreidents