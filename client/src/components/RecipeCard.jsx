import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import RecipeCardPage from "./RecipeCardPage";

function RecipeCard(props){
    const {cook_time, created_date, difficulty, image, instruction, name} = props.recipe
    const navigate = useNavigate()
    const [formattedDate, setFormattedDate] = useState("")

    useEffect(() => {
        const timestamp = Date.parse(created_date)
        const backendDateObj = new Date(timestamp)

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        const formattedDateStr = backendDateObj.toLocaleDateString(undefined, options)

        setFormattedDate(formattedDateStr)
    }, [created_date])

   function handleViewMore(e){
        console.log(props.recipe.id)
        navigate(`/recipes/${props.recipe.id}`)
        return <RecipeCardPage key={props.recipe.id} recipeData={props.recipe} chef_id={props.recipe.chef_id}/>
    }

    return (
        <div className="card-container">
        <div className="card w-72 h-128 bg-secondary shadow-xl rounded-xl">
            <div className="rounded-xl" >
                <figure className="w-full h-2/3">
                    <img src={image} alt={name} className="w-full h-max object-cover rounded-t-xl" />
                </figure>
                <div className="card-body p-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <h1 className="card-title font-sans text-scale-vw">{name}</h1>
                    <p className=" text-base font-mono text-scale-vw">Difficulty: {difficulty}</p>
                    <p className=" text-base font-mono text-scale overflow-hidden max-h-20">Cook Time: {cook_time} Minutes</p>
                    <div className="card-actions">
                        <button className="btn text-accent-content btn-primary" onClick={handleViewMore}>View More</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default RecipeCard