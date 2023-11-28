import React, { useEffect, useState } from "react"

function RecipeCard(props){
    const {id, cook_time, created_date, difficulty, image, instruction, name} = props.recipe

    const [formattedDate, setFormattedDate] = useState("")

    useEffect(() => {
        const timestamp = Date.parse(created_date)
        const backendDateObj = new Date(timestamp)

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        const formattedDateStr = backendDateObj.toLocaleDateString(undefined, options)

        setFormattedDate(formattedDateStr)
    }, [created_date])

    return (
        <div className="recipe-card">
            <h3>{name}</h3>
            <div className="img-container">
                <img src={image} alt={name}></img>
            </div>
            <div className="recipe-info">
                <p>Level: {difficulty}</p>
                <p>{cook_time} minutes</p>
                <p>Directions: <br></br> {instruction}</p>
                <p>Published on: {formattedDate}</p>
            </div>
        </div>
    )
}

export default RecipeCard