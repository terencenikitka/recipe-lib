import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/recipes")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      })
      .then((recipes) => {
        setRecipes(recipes);
        console.log("Recipes:", recipes);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  const [visibleRecipes, setVisibleRecipes] = useState(8);

  const loadMore = () => {
    setVisibleRecipes(visibleRecipes + 8);
  };

  return (
    <div className="container">
      <div className="recipe-container columns-3">
        {recipes.slice(0, visibleRecipes).map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
