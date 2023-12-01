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
    <div className="bg-gray-light p-8 rounded-lg shadow-md max-w-md mx-auto mt-16 w-96">
      <h1 className="text-2xl font-bold mb-4">Create a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-dark">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-dark">Image (Base64):</span>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-dark">Cook Time (in minutes):</span>
          <input
            type="number"
            name="cook_time"
            value={formData.cook_time}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-dark">Difficulty:</span>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="form-select mt-1 block w-full"
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-gray-dark">Instruction:</span>
          <textarea
            name="instruction"
            value={formData.instruction}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-dark">Ingredients:</span>
          <Select
            multi
            values={formData.ingredients.filter((ingredient) =>
              formData.ingredient.includes(ingredient.id)
            )}
            options={formData.ingredients}
            onChange={(values) => handleSelectChange(values, 'ingredient')}
            labelField="name"
            valueField="id"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-dark">Cuisine:</span>
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="form-select mt-1 block w-full"
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

        <button
          type="submit"
          className="bg-orange text-white py-2 px-4 rounded-full hover:bg-purple focus:outline-none focus:shadow-outline-orange"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
