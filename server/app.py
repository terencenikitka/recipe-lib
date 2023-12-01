#!/usr/bin/env python3
# секретное сообщение 
# Standard library imports
import os
# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource
from datetime import datetime


# Local imports
from config import app, db, api, bcrypt

from models import Cuisine,Ingredient,RecipeCuisine,RecipeIngredient,Recipe,Chef,Comment


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


@app.before_request
def check_if_logged():
    #routes we want user to see without login defined by endpoints
    open_access = [
        'login',
        'logout',
        'check_session',
        'recipes'
    ]
    if (request.endpoint) not in open_access and (not session.get('user_id')):
        return {'error':'User must be logged in'}, 401
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

    def post(self):
        params = request.json
        try:
            ingredient = Ingredient(name = params['name'])
        except:
            return make_response({'error':['something wrong, ask Nikita']}, 422)
        db.session.add(ingredient)
        db.session.commit()
        return make_response(ingredient.to_dict(rules=('-recipe_ingredients',)), 201)               

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

    def post(self):
        params = request.json
        print("Received JSON data:", params)

        try:
            created_date = datetime.utcnow()

            # Make sure to parse parameters correctly
            recipe = Recipe(
                name=params['name'],
                image=params['image'],
                created_date=created_date,
                difficulty=params['difficulty'],
                cook_time=params['cook_time'],
                instruction=params['instruction'],
                chef_id=params['chef_id']
            )

            # Assuming 'ingredients' is a list of ingredient IDs
            ingredient_ids = params.get('ingredients', [])
            recipe.recipe_ingredients = [RecipeIngredient(ingredient_id=ingredient_id) for ingredient_id in ingredient_ids]

            # Assuming 'cuisines' is a list of cuisine IDs
            cuisine_ids = params.get('cuisine', [])
            recipe.recipe_cuisines = [RecipeCuisine(cuisine_id=cuisine_id) for cuisine_id in cuisine_ids]

        except Exception as e:
            return make_response({'error': str(e)}, 422)

        db.session.add(recipe)
        db.session.commit()

        return make_response(recipe.to_dict(rules=('chef', 'comments', 'recipe_ingredients', 'recipe_cuisines')), 201)





        db.session.add(recipe)
        db.session.commit()


        return make_response(recipe.to_dict(rules=('chef', 'comments', 'recipe_ingredients', 'recipe_cuisines')), 201)                    
        
api.add_resource(Recipes,'/recipes',endpoint='recipes')        

class RecipeById (Resource):

    def get(self,id):
        recipe = Recipe.query.get(id)
        if not recipe:
            return make_response({'error':'recipe not found'},404)
        return make_response(recipe.to_dict(rules = ('-chef','-comments','-recipe_ingredients','-recipe_cuisines')),200)

    def patch (self,id):
        recipe = Recipe.query.get(id)
        if not recipe:
            return make_response({'error':'recipe not found'},404)
        params = request.json
        try:
            for attr in params:
                setattr(recipe,attr,params[attr])
        except:
            return make_response({'error':['something wrong, ask Nikita']},422)
        db.session.commit()

        return make_response(recipe.to_dict(rules = ('-chef','-comments','-recipe_ingredients','-recipe_cuisines')),200)

    def delete(self,id):
        recipe = Recipe.query.get(id)
        if not recipe:
            return make_response({'error':'recipe not found'},404)
        db.session.delete(recipe)
        db.session.commit()
        return make_response('',204)        

api.add_resource(RecipeById,'/recipes/<id>') 

class Chefs (Resource):

    def get(self):
        all_chefs = Chef.query.all()
        chefs_data = [chef.to_dict(rules=('-comments', '-recipes')) for chef in all_chefs]
        return make_response(chefs_data, 200)

    def post (self):
        params = request.json()
        password = request.get_json()['password']
        try:
            chef = Chef(first_name=params['first_name'],bio=params['bio'],pic=params['pic'],last_name=params['last_name'],email=params['email'])
            chef.password_hash = password
        except:
            return make_response({'error':['something wrong ask NIkita']},422)
        db.session.add(chef)
        db.session.commit()
        session['user_id'] = chef.id
        return make_response(chef.to_dict(rules=('-comments', '-recipes')),201)           

api.add_resource(Chefs,'/chefs')

class ChefById(Resource):

    def get(self,id):
        chef = Chef.query.get(id)
        if not chef:
            return make_response({'error':'chef not found'},404)
        return make_response(chef.to_dict(rules=('-comments', '-recipes')),200)    

    def patch(self,id):
        chef = Chef.query.get(id)
        if not chef:
            return make_response({'error':'chef not found'},404)
        params = request.json
        try:
            for attr in params:
                setattr(chef,attr,params[attr])
        except:
            return make_response({'error':'something wrong,ask Nikita'},422)
        db.session.commit()

        return make_response(chef.to_dict(rules=('-comments', '-recipes')),200)     

    def delete(self,id):
        chef = chef.query.get(id)
        if not chef:
            return make_response({'error':'chef not found'},404)
        db.session.delete(chef)
        db.session.commit()
        return make_response('',204)                       

api.add_resource(ChefById,'/chefs/<id>')

class Comments (Resource):

    def get(self):
        recipe_id = request.args.get('recipe_id')

        all_comments = Comment.query.filter_by(recipe_id=recipe_id).all()
        comment_data = []

        for comment in all_comments:
            comment_info = comment.to_dict(rules=('chef_id', 'recipe_id'))
            
            # Fetch chef information and include it in the comment_data
            chef = Chef.query.get(comment.chef_id)
            if chef:
                comment_info['chef_first_name'] = chef.first_name
                comment_info['chef_last_name'] = chef.last_name
            
            comment_data.append(comment_info)

        return make_response(comment_data, 200)

    def post(self):
        params = request.json
        try:
            created_date = datetime.utcnow()
            comment = Comment(
                comment_text=params['comment_text'],
                created_date=created_date,
                chef_id=params['chef_id'],
                recipe_id=params['recipe_id']
            )
          
        except:
              
            return make_response({'error': ['something wrong with comment post, ask Nikita',comment]}, 422)
        db.session.add(comment)
        db.session.commit()
        return make_response(comment.to_dict(rules=('chef', 'recipe')), 201)

api.add_resource(Comments,'/comments')        

class CommentById (Resource):
    
    def get(self,id):
        comment = Comment.query.get(id)
        if not comment:
            return make_response({'error':'comment not found'},404)
        return make_response(comment.to_dict(rules = ('-chef','-recipe')),200)    \

    def patch (self,id):
        comment = Comment.query.get(id)
        if not comment:
            return make_response({'error':'comment not found'},404)
        params=request.json
        try:
            for attr in params:
                setattr(comment,attr,params[attr])
        except:
            return make_response({'error':['something wrong, ask Nikita']},422)
        db.session.commit()

        return make_response(comment.to_dict(rules = ('-chef','-recipe')),200)         

    def delete (self,id):
        comment = Comment.query.get(id)
        if not comment:
            return make_response({'error':'comment not found'},404)
        db.session.delete(comment)
        db.session.commit()
        return make_response('',204)                   

api.add_resource(CommentById,'/comments/<id>')   
class Login(Resource):
    def post(self):
        email = request.get_json()['email']
        password = request.get_json()['password']
        chef = Chef.query.filter(Chef.email == email).first()
        if chef.authenticate(password):
            session['user_id'] = chef.id
            return make_response(chef.to_dict(),200)
        return {'error':'401 Invalid email and password'}, 401
        

class Logout(Resource):
    def delete(self):
        session['user.id'] = None
        return {},204

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = Chef.query.filter(Chef.id == user_id).first()
            return user.to_dict(),200
        return 'Not Logged In'

api.add_resource(Login,'/login', endpoint='login')
api.add_resource(Logout,'/logout', endpoint='logout')
api.add_resource(CheckSession,'/check_session', endpoint='check_session')
@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

