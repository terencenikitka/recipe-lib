import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard"

function Recipes(){
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5555/recipes")
            .then( r => {
                if (r.ok) {
                    return r.json()
                }
                throw r
            })
            .then((recipes) => {
                setRecipes(recipes)
                console.log(recipes)
            })
            .catch((e) => {
                console.error("Error fetching recipes:", e)
            })
    }, [])

    const [visibleRecipes, setVisibleRecipes] = useState(8)

    const loadMore = () => {
        setVisibleRecipes(visibleRecipes + 8)
    }

    return (
        <div className="container">
            <div className="recipe-container columns-3">
                {recipes.slice(0, visibleRecipes).map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}

export default Recipes;