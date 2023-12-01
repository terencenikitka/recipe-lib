import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-dropdown-select';

function CreateRecipe() {
  const initialFormData = {
    name: '',
    image: '',
    difficulty: 'Easy',
    cook_time: '',
    instruction: '',
    chef_id: 1,
    ingredients: [],
    cuisines: [],
    ingredient: [],
    cuisine: '1',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [chefs, setChefs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5555/chefs')
      .then((response) => response.json())
      .then((chefsData) => {
        setChefs(chefsData);
        const randomChef =
          chefsData[Math.floor(Math.random() * chefsData.length)];
        setFormData((prevFormData) => ({
          ...prevFormData,
          chef_id: randomChef.id,
        }));
      })
      .catch((error) => {
        console.error('Error fetching chefs:', error);
      });

    fetch('http://127.0.0.1:5555/cuisines')
      .then((response) => response.json())
      .then((cuisinesData) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          cuisines: cuisinesData,
        }));
      })
      .catch((error) => {
        console.error('Error fetching cuisines:', error);
      });

    fetch('http://127.0.0.1:5555/ingredients')
      .then((response) => response.json())
      .then((ingredientsData) => {
        const filteredIngredients = ingredientsData.filter(
          (ingredient) => ingredient.id !== undefined
        );
        setFormData((prevFormData) => ({
          ...prevFormData,
          ingredients: filteredIngredients,
        }));
      })
      .catch((error) => {
        console.error('Error fetching ingredients:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'ingredients') {
      const ingredientId = parseInt(value, 10);
      let updatedIngredients;

      if (checked) {
        updatedIngredients = [...formData.ingredient, ingredientId];
      } else {
        updatedIngredients = formData.ingredient.filter(
          (id) => id !== ingredientId || formData.ingredient.indexOf(id) !== id
        );
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        ingredient: updatedIngredients,
      }));
    } else if (type === 'select-one' && name === 'cuisine') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSelectChange = (values, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: values.map((v) => v.id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithChef = { ...formData, chef_id: formData.chef_id };

    const formattedData = {
      ...formDataWithChef,
      cook_time: parseInt(formDataWithChef.cook_time, 10),
      ingredients: formDataWithChef.ingredient.filter((id) => id),
      cuisines: formDataWithChef.cuisines.map((cuisineId) => cuisineId.id),
      ingredient: formData.ingredient,
    };

    fetch('http://127.0.0.1:5555/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Recipe created response:', data);
        navigate(`/recipes/${data.id}`);
      })
      .catch((error) => {
        resetForm();
        console.error('Error creating recipe:', error);
      });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const getIngredientNameById = (ingredientId) => {
    const ingredient = formData.ingredients.find(
      (item) => item.id === ingredientId
    );
    return ingredient ? ingredient.name : '';
  };

  return (

    <div className="flex align-center justify-center mb-6  w-screen rounded-xl ">
      <div className='bg-secondary-content px-24 pt-6 pb-10 mt-16 rounded-md'>
      <h1 className="text-5xl font-bodoni-moda font-bold mb-4 pt-5 text-center text-secondary custom-h1">Create a New Recipe</h1>
      <form onSubmit={handleSubmit} className='text-accent'>
        <label className="block mb-4">
          <span className="">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block input input-bordered w-full max-w-xs"
            required
          />
        </label>

 

            <label className="block mb-4">
              <span className="">Image URL:</span>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="block input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="block mb-4">
              <span className="">Cook Time (in minutes):</span>
              <input
                type="number"
                name="cook_time"
                value={formData.cook_time}
                onChange={handleChange}
                className="block input input-bordered w-full max-w-xs"
                required
              />
            </label>

            

            <label className="block mb-4">
              <span className=" text-lg">Instructions:</span>
              <textarea
                name="instruction"
                value={formData.instruction}
                onChange={handleChange}
                className="block input input-bordered w-full max-w-xs"
                required
              />
            </label>
        <label className="block mb-4">
          <span className=" text-lg pb-10">Ingredients:</span>
          <Select
            multi
            values={formData.ingredients.filter((ingredient) =>
              formData.ingredient.includes(ingredient.id)
            )}
            options={formData.ingredients}
            onChange={(values) => handleSelectChange(values, 'ingredient')}
            labelField="name"
            valueField="id"
            className='bg-base-100 rounded-lg block max-w-max w-full'
          />
        </label>

        <label className="block mb-4">
              <span className="">Select a Difficulty:</span>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="block select w-full max-w-xs"
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>
        <label className="block mb-4">
          <span className="">Cuisine:</span>
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="block select w-full max-w-xs"
            required
          >
            {formData.cuisines &&
              formData.cuisines.map((cuisine) => (
                <option key={cuisine.id} value={cuisine.id}>
                  {cuisine.name}
                </option>
              ))}
          </select>
        </label>
        <div className='text-center text-white'>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-full hover:bg-purple focus:outline-none focus:shadow-outline-orange"
            >
              Create Recipe
            </button>
            </div>
          </form>
        </div>
       </div>
  );
}

export default CreateRecipe;
