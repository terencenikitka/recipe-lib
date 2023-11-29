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
        c1 = Chef(first_name="Peyton", last_name="Meredith",bio="SomeIntrestingBio",pic="SomePicUrl",password = '123', email="peymeredith@gmail.com")
        c2 = Chef(first_name="Nikita", last_name="Maslakov", bio="SomeIntrestingBio",pic="SomePicUrl", password = 'ss', email="something@gmail.com") 
        c3 = Chef(first_name="Mateusz", last_name="Trybunia", bio="SomeIntrestingBio",pic="SomePicUrl", password = '123', email="somethingelse@gmail.com" )
        db.session.add_all([c1,c2,c3])
        db.session.commit()
        
        #adding Recipes
        r1 = Recipe(name="Peanut Butter and Jelly Sandwich", image="https://t.ly/JFSIc",
                created_date=datetime.now(), difficulty="Easy", cook_time=10, instruction="1. On one slice of bread, spread peanut butter evenly over the bread.\n2. On the other slice of bread, spread the jelly evenly over the bread.\n3. Put the two slices of bread together with the peanut butter and jelly facing in.\n4. Serve and enjoy!\n5. Optional: Remove crusts, cut diagonally", chef_id=3)
        r2 = Recipe(name="Macaroni and Cheese", 
                image="https://joyfoodsunshine.com/wp-content/uploads/2019/04/easy-homemade-mac-and-cheese-recipe-1x1-1.jpg", 
                created_date=datetime.now(), difficulty="Medium", cook_time=30, 
                instruction="1. Cook elbow macaroni according to package instructions. Be sure to add ¼ tsp salt to the water used to boil the noodles. Drain, and set aside.\n2. Mix flour, sea salt, and garlic powder together in a small bowl. Set aside.\n3. In a medium saucepan over medium heat, melt the butter.\n4. Add flour mixture and whisk to combine.\n5. Cook for 1 minute until mixture is slightly brown.\n6. Add 1 cup milk and whisk until the mixture is smooth.\n7. Add sour cream (or Greek yogurt) and whisk until smooth.\n8. Cook on medium-high heat until the mixture is thickened (about 3-5 minutes). Do not let it boil.\n9. Once mixture is thick (sticks to the back of the spatula), reduce heat to low and add cheese. Whisk until cheese is melted and mixture is smooth. Taste and add more salt/seasoning if desired.\n10. Add cooked pasta to the pot of cheese sauce and stir until the sauce is evenly distributed.\n11. Let the mac and cheese cool for 3-5 minutes or until the cheese sauce has thickened a little bit and sticks to the noodles. Serve warm!", chef_id=2)
        r3 = Recipe(name="Creme Brûlée", 
                image="https://natashaskitchen.com/wp-content/uploads/2020/02/Creme-Brule-Recipe-SQ.jpg", created_date=datetime.now(), difficulty="Hard", cook_time=40,     
                instruction="1. Heat cream: In a small pot, heat cream over medium heat until hot but not boiling — small bubbles will appear just along the edge of the pot.\n2. Whisk yolks, sugar and vanilla: Meanwhile, whisk together egg yolks, 1/3 cup sugar and vanilla — I like to do this in a large glass measuring cup for easy pouring!\n3. Add egg yolk mixture to cream: When the cream is hot, add it to the egg yolk mixture a little at a time, whisking well after each addition.\n4. Pour: Pour into 4 7-8oz ramekins (wider and shallower is better if you have them).\n5. Add to water bath: Place filled ramekins in a large baking dish and fill the baking dish with hot water so that it comes 3/4 of the way up the sides of the ramekins — be careful not to get any water in the custard!\n6. Bake: Bake at 325 degrees F for 30-45 minutes — this will depend on how deep the custard is! (smaller ramekins mean a deeper custard = longer bake time) The top will appear set but underneath it will still jiggle.\n7. Cool and chill: Cool to room temperature and then refrigerate for at least 2 hours until chilled. (You can wrap and refrigerate up to 3 days).\n8. Add sugar and torch: Sprinkle each custard with 1 tablespoon granulated sugar and torch or broil just until caramelized. Serve immediately or chill to serve later.", chef_id=1)
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
