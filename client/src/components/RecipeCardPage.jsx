import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";

function RecipeCardPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/recipes/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch recipe");
      })
      .then((recipeData) => {
        setRecipe(recipeData);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [id]);

 
  function handleBack(){
    navigate(`/recipes`)
  }
  
  return (
    <>
      {recipe && (
        <div className="card w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 bg-base-1/2 shadow-xl max-h-min rounded-xl">
          <div className="justify-center rounded-xl">
            <figure className="">
              <img src={recipe.image} alt={recipe.name} className="max-h-min object-cover md:h-full w-fit" />
            </figure>
            <div className="card-body w-fit h-fit ">
              <h1 className="card-title justify-center text-center font-sans">{recipe.name}</h1>
              <p className="text-base text-center font-mono">Difficulty: {recipe.difficulty}</p>
              <p className="text-base text-center font-mono">Cook Time: {recipe.cook_time} Minutes</p>
              <h1 className="card-title justify-center text-center font-sans">{recipe.instruction}</h1>
              <div className="card-actions justify-center">
              <div className="card-actions justify-center">
                        <button className="btn btn-secondary" onClick={handleBack}>GO back</button>
                    </div>
               
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeCardPage;
