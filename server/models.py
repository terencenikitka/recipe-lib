from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db

class Cuisine(db.Model, SerializerMixin):
    __tablename__ = 'cuisines'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    recipe_cuisines = db.relationship('RecipeCuisine', back_populates='cuisine')
    recipes = association_proxy('recipe_cuisines', 'recipe')

    @validates('name')
    def validates_name(self, key, new_name):
        if new_name:
            return new_name
        raise ValueError('Cuisine must have a name!')

    def to_dict(self, rules=None):
        rules = rules or ()
        if '-recipe_cuisines' in rules:
            return {'id': self.id, 'name': self.name}
        return super().to_dict(rules)

class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='ingredient')

    @validates('name')
    def validates_name(self, key, new_name):
        if new_name:
            return new_name
        raise ValueError('Ingredient must have a name!')

    def to_dict(self, rules=None):
        rules = rules or ()
        if '-recipe_ingredients' in rules:
            return {'id': self.id, 'name': self.name}
        return super().to_dict(rules)

class RecipeCuisine(db.Model, SerializerMixin):
    __tablename__ = 'recipe_cuisines'

    id = db.Column(db.Integer, primary_key=True)

    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    recipe = db.relationship('Recipe', back_populates='recipe_cuisines', cascade='all, delete-orphan', single_parent=True)
    
    cuisine_id = db.Column(db.Integer, db.ForeignKey('cuisines.id'))
    cuisine = db.relationship('Cuisine', back_populates='recipe_cuisines')

    def to_dict(self, rules=None):
        rules = rules or ()
        if '-recipe' in rules and '-cuisine' in rules:
            return {'id': self.id, 'recipe_id': self.recipe_id, 'cuisine_id': self.cuisine_id}
        return super().to_dict(rules)

class RecipeIngredient(db.Model, SerializerMixin):
    __tablename__ = 'recipe_ingredients'

    id = db.Column(db.Integer, primary_key=True)

    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))

    recipe = db.relationship('Recipe', back_populates='recipe_ingredients', cascade='all, delete-orphan', single_parent=True)
    ingredient = db.relationship('Ingredient', back_populates='recipe_ingredients')

    def to_dict(self, rules=None):
        rules = rules or ()
        if '-recipe' in rules and '-ingredient' in rules:
            return {'id': self.id, 'recipe_id': self.recipe_id, 'ingredient_id': self.ingredient_id}
        return super().to_dict(rules)

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
    comments = db.relationship('Comment', back_populates='recipe', cascade='all, delete-orphan')
    cuisines = db.relationship("RecipeCuisine", back_populates="recipe", cascade="all, delete-orphan", overlaps="recipe_cuisines")
    
    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='recipe', cascade='all, delete-orphan')
    recipe_cuisines = db.relationship('RecipeCuisine', back_populates='recipe', cascade='all, delete-orphan')

    @validates('name')
    def validates_name(self, key, new_name):
        if new_name:
            return new_name
        raise ValueError('Recipe must have a name!')

    @validates('image')
    def validates_image(self, key, new_image):
        if not new_image:

            raise ValueError('Recipe must have an image!')

         


        return new_image 

    @validates('created_date')
    def validates_created_date(self, key, new_created_date):
        if new_created_date:
            return new_created_date
        raise ValueError('Recipe must have a created date!')

    @validates('difficulty')
    def validates_difficulty(self, key, new_difficulty):
        if new_difficulty:
            return new_difficulty
        raise ValueError('Recipe must have a difficulty level')         

    @validates('cook_time')
    def validates_cook_time(self, key, new_cook_time):
        if new_cook_time is not None:
            if not isinstance(new_cook_time, int):
                raise ValueError('Cook time must be a number!')
        return new_cook_time

    @validates('instruction')
    def validates_instruction(self, key, new_instruction):
        if new_instruction:
            return new_instruction
        raise ValueError('Recipe must have instructions!')

    @validates('chef_id')
    def validates_chef_id(self, key, new_chef_id):
        if new_chef_id:
            return new_chef_id
        raise ValueError('Who is cooking ?!?')            

    def to_dict(self, rules=None):
        rules = rules or ()
        if '-chef' in rules and '-comments' in rules and '-recipe_ingredients' in rules and '-recipe_cuisines' in rules:
            return {
                
                'id': self.id,
                'name': self.name,
                'image': self.image,
                'created_date': self.created_date,
                'difficulty': self.difficulty,
                'cook_time': self.cook_time,
                'instruction': self.instruction,
                'chef_id': self.chef_id,
                'comments': [comment.to_dict(['-chef']) for comment in self.comments],
            }
        return super().to_dict(rules + ('-recipe_ingredients', '-recipe_cuisines'))
        

class Chef(db.Model, SerializerMixin):
    __tablename__ = 'chefs'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    bio = db.Column(db.String)
    pic = db.Column(db.String)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String)

    comments = db.relationship('Comment', back_populates='chef')
    recipes = db.relationship('Recipe', back_populates='chef', cascade='all, delete-orphan')

    @validates('first_name')
    def validates_first_name(self, key, new_first_name):
        if not new_first_name:
            raise ValueError('Chef must have a name')
        if len(new_first_name) >= 3:
            return new_first_name
        raise ValueError('Name should have more than 2 char')

    @validates('last_name')
    def validates_last_name(self, key, new_last_name):
        if not new_last_name:
            raise ValueError('Chef must have a last name')

        

        if (len(new_last_name)>0):

            return new_last_name
        raise ValueError('Last name should have more than 2 char')

    @validates('bio')
    def validates_bio(self, key, new_bio):
        if not new_bio:
            raise ValueError('Chef must have a bio')
        return new_bio

    @validates('pic')
    def validates_pic(self, key, new_pic):
        if not new_pic:
            raise ValueError('Chef must have a picture')
        return new_pic

    @validates('password')
    def validates_password(self, key, new_password):
        if not new_password:
            raise ValueError('Chef must have a password')
        return new_password

    @validates('email')
    def validates_email(self, key, new_email):
        if not new_email:
            raise ValueError('Chef must have an email')
        return new_email

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String)
    created_date = db.Column(db.DateTime)

    chef_id = db.Column(db.Integer, db.ForeignKey('chefs.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    chef = db.relationship('Chef', back_populates='comments')
    recipe = db.relationship('Recipe', back_populates='comments')

    @validates('comment_text')
    def validates_comment_text(self, key, new_content):
        if not new_content:
            raise ValueError('Comment must have content')
        return new_content

    def to_dict(self, rules=None):
        rules = rules or ()
        
        
        return {
                'id': self.id,
                'comment_text': self.comment_text,
                'created_date': self.created_date,
                'chef_id': self.chef_id,
                'recipe_id': self.recipe_id,
            }
       




