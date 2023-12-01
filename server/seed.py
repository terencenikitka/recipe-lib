#!/usr/bin/env python3

# Standard library imports
import random

# Remote library imports
from faker import Faker
from datetime import datetime
from faker_food import FoodProvider
from faker.providers import lorem
# Local imports
from app import app
from models import db,Chef,Comment,Recipe,RecipeIngredient,RecipeCuisine,Ingredient,Cuisine

fake = Faker('en_US')
fake.add_provider(FoodProvider)
fake.add_provider(lorem)

print(fake.locales)

def create_chefs():
    chefs = []
    for _ in range(20):
        c = Chef(
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            bio = fake.paragraph(nb_sentences=4),
            pic = "https://picsum.photos/200",
            password = "12345",
            email = fake.unique.email()
        )
        chefs.append(c)
    return chefs

def select_difficulty():
    difficulties = ['Beginner', 'Intermediate', 'Advanced']
    selected_difficulty = random.choice(difficulties)
    return selected_difficulty


def generate_time(start, end):
    while True:
        number = random.randint(start, end)
        if number % 5 == 0:
            return number


def generate_random_param():
    return random.randint(1, 1000)

def create_recipes():
    recipes = []
    for _ in range(80):
        random_param = generate_random_param()
        r = Recipe(
            name = fake.dish(),
            image=f"https://picsum.photos/200/?random={random_param}",
            created_date = fake.date_this_year(),
            difficulty = select_difficulty(),
            cook_time = generate_time(10,180),
            instruction = fake.dish_description()
        )
        recipes.append(r)
    return recipes

def create_ingredients():
    ingredients = []
    for _ in range(100):
        i = Ingredient(
            name = fake.unique.ingredient()
        )
        ingredients.append(i)
    return ingredients

def create_cuisines():
    cuisines = []
    for _ in range(15):
        c = Cuisine(
            name=fake.unique.ethnic_category()
        )
        cuisines.append(c)
    return cuisines

def create_comments():
    comments = []
    for _ in range(50):
        c = Comment(
            comment_text = fake.paragraph(nb_sentences=3),
            created_date=fake.date_this_year(),
            chef_id = random.randint(1, 20),
            recipe_id = random.randint(1, 80),
        )
    return comments



if __name__ == '__main__':
    
    with app.app_context():
        print("Clearing db...")
        Comment.query.delete()
        Chef.query.delete()
        Recipe.query.delete()
        RecipeIngredient.query.delete()
        RecipeCuisine.query.delete()
        Ingredient.query.delete()
        Cuisine.query.delete()
        

        

    
        print("Seeding chefs...")
        chefs = create_chefs()
        db.session.add_all(chefs)
        db.session.commit()

        print("Seeding recipes...")
        recipes = create_recipes()
        db.session.add_all(recipes)
        db.session.commit()

        print("Seeding ingredients...")
        ingredients = create_ingredients()
        db.session.add_all(ingredients)
        db.session.commit()

        print("Seeding cuisines...")
        cuisines = create_cuisines()
        db.session.add_all(cuisines)
        db.session.commit()

        print("Seeding comments...")
        comments = create_comments()
        db.session.add_all(comments)
        db.session.commit()

