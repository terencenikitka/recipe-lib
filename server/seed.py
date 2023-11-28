#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from datetime import datetime
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
        r1 = Recipe(name="Burn Water",image="someimage",created_date=datetime.now(),difficulty="Hard",cook_time=30,instruction="You do what now?",chef_id=3)
        r2 = Recipe(name="Simmer Water",image="someimage",created_date=datetime.now(),difficulty="Medium",cook_time=30,instruction="Just add salt.",chef_id=2)
        r3 = Recipe(name="Boil Water",image="someimage",created_date=datetime.now(),difficulty="Easy",cook_time=30,instruction="Just add salt.",chef_id=1)
        db.session.add_all([r1,r2,r3])
        db.session.commit()
        #adding Cuisines
        cu1 = Cuisine(name="Italian")
        cu2 = Cuisine(name="Not Italian")
        db.session.add_all([cu1,cu2])
        db.session.commit()
        #adding Recipe_cuisine
        rc1 = RecipeCuisine(recipe_id=2,cuisine_id=1)
        rc2 = RecipeCuisine(recipe_id=3,cuisine_id=1)
        rc3 = RecipeCuisine(recipe_id=1,cuisine_id=2)
        db.session.add_all([rc1,rc2,rc3])
        db.session.commit()
        #adding Ingredients
        i1 = Ingredient(name="Water")
        i2 = Ingredient(name="Salt")
        i3 = Ingredient(name="Grandmas not so special sauce")
        db.session.add_all([i1,i2,i3])
        db.session.commit()
        #adding Recipe_ingreidents
        ri1 = RecipeIngredient(recipe_id=1,ingredient_id=1)
        ri2 = RecipeIngredient(recipe_id=1,ingredient_id=2)
        ri3 = RecipeIngredient(recipe_id=1,ingredient_id=3)
        ri4 = RecipeIngredient(recipe_id=3,ingredient_id=2)
        ri5 = RecipeIngredient(recipe_id=3,ingredient_id=1)
        ri6 = RecipeIngredient(recipe_id=2,ingredient_id=1)
        db.session.add_all([ri1,ri2,ri3,ri4,ri5,ri6])
        db.session.commit()
