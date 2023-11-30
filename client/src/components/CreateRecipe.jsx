import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    created_date: "",
    difficulty: "",
    cook_time: "",
    instruction: "",
    chef_id: 1, // You may need to set the chef_id based on the authenticated user
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5555/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Recipe created successfully:", data);
        // Redirect to the recipe page or any other page after successful creation
        navigate(`/recipes/${data.id}`);
      })
      .catch((error) => {
        console.error("Error creating recipe:", error);
      });
  };

  return (
    <div>
      <h1>Create a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields based on your Recipe model */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        {/* Add other form fields here */}
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
