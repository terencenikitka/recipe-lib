import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard"



function Recipes(){
    const [recipes, setRecipes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [visibleRecipes, setVisibleRecipes] = useState(8)

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

    const loadMore = () => {
        setVisibleRecipes(visibleRecipes + 8);
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const loadPrevious = () => {
        setVisibleRecipes(visibleRecipes - 8);
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div>
            <div className="w-screen recipe-container container grid grid-cols-4 grid-rows-2 gap-4 mt-16 mb-6">
                {recipes.slice((currentPage - 1) * 8, currentPage * 8).map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
                
            </div>
            <div className="join grid grid-cols-2 place-content-center justify-center mb-6">
                    <button className="join-item btn btn-outline ml-96" onClick={loadPrevious} disabled={currentPage === 1}>Previous page</button>
                    <button className="join-item btn btn-outline mr-96" onClick={loadMore} disabled={currentPage * 8 >= recipes.length}>Next Page</button>
            </div>
        </div>
    )
}

export default Recipes;