from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, SQLAlchemy, MetaData

class Cuisine(db.Model, SerializerMixin):
    __tablename__ = 'cuisines'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    recipe_cuisines = db.relationship('RecipeCuisine', back_populates='cuisine')

    @validates('name')
    def validates_name(self,key,new_name):
            if new_name:
                return new_name
            raise ValueError('Cuisine must have a name!')                

class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='ingredient')

    @validates('name')
    def validates_name(self,key,new_name):
            if new_name:
                return new_name
            raise ValueError('Ingredient must have a name!')    

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
    # comments = db.relationship('Comment', back_populates='recipe')
    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='recipe')
    recipe_cuisines = db.relationship('RecipeCuisine', back_populates='recipe')

    @validates('name')
    def validates_name(self,key,new_name):
            if new_name:
                return new_name
            raise ValueError('Recipe must have a name!')   

    @validates( 'image' )
    def validates_image(self, key, new_image):
        if not new_image:
         raise ValueError('Recipe must have an image!')

        return new_image 

    @validates('created_date')
    def validates_created_date(self,key,new_created_date):
        if new_created_date:
            return new_created_date
        raise ValueError('Recipe must have a created date!')     

    @validates('difficulty')
    def validates_difficulty(self,key,new_difficulty):
        if new_difficulty:
            return new_difficulty
        raise ValueError('Recipe must have a difficulty level')         

    @validates('cook_time')
    def validates_cook_time(self, key, new_cook_time):
        if not new_cook_time:
         raise ValueError('Recipe must have a cook time')
        try:
         int_cook_time = int(new_cook_time)
         if type(int_cook_time) == int:
             return new_cook_time
        except ValueError:
            raise ValueError('Cook time must be a number!')        

    @validates('instruction')
    def validates_instruction(self, key, new_instruction):
        if new_instruction:
         return new_instruction
        raise ValueError('Recipe must have instructions!')


    @validates('chef_id')
    def validates_chef_id(self,key,new_chef_id):
        if new_chef_id:
            return new_chef_id
        raise ValueError('Who is cooking ?!?')            

class Chef(db.Model, SerializerMixin):
    __tablename__ = 'chefs'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    bio = db.Column(db.String)
    pic = db.Column(db.String)
    password = db.Column(db.Integer, nullable = False)
    email = db.Column(db.String)


    # comments = db.relationship('Comment', back_populates='chef')
    recipes = db.relationship('Recipe', back_populates='chef')

    @validates('first_name')
    def validates_first_name(self,key,new_first_name):
        if not new_first_name:
            raise ValueError('Chef must have a name')
        if (len(new_first_name)>=3):
            return new_first_name
        raise ValueError('Name should have more than 2 char')        

    @validates('last_name')
    def validates_last_name(self,key,new_last_name):
        if not new_last_name:
            raise ValueError('Chef must have a last name')
        if (len(new_last_name)>0):
            return new_last_name
        raise ValueError('Last name should have more than 2 char')    

    @validates('bio')
    def validates_bio(self,key,new_bio):
        if new_bio:
            return new_bio
        raise ValueError('Chef must have bio')

    @validates('pic')
    def validates_pic(self,key,new_pic):
        if not new_pic:
         raise ValueError('Chef must have an pic!')
        return new_pic 

    @validates('email')
    def validates_email(self, key, new_email):
        if not new_email:
            raise ValueError('Chef must have an email address!')
        if '@' not in new_email or '.' not in new_email:
            raise ValueError('Invalid email address format!')
        existing_chef = Chef.query.filter(Chef.email == new_email).first()
        if existing_chef and existing_chef.id != self.id:
            raise ValueError('Email address already exists in the database!')

        return new_email
        


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String)
    created_date = db.Column(db.DateTime)

    chef_id = db.Column(db.Integer, db.ForeignKey('chefs.id'))    
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    # chef = db.relationship('Chef', back_populates='comments')
    # recipe = db.relationship('Recipe', back_populates='comments')

    @validates('comment_text')
    def validates_comment_text(self, key, new_comment_text):
        if new_comment_text:
            return new_comment_text
        raise ValueError('Comment must have text!')