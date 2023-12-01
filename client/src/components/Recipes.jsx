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
        <div>
            <div className="w-screen recipe-container container grid grid-cols-4 grid-rows-2 gap-4 mt-16 mb-6">
                {recipes.slice(0, visibleRecipes).map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
                
            </div>
            <div className="join grid grid-cols-2 place-content-center">
                    <button className="join-item  btn btn-outline">Previous page</button>
                    <button className="join-item btn btn-outline">Next</button>
            </div>
        </div>
    )
}

export default Recipes;