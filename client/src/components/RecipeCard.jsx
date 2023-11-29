import React, { useEffect, useState } from "react"

function RecipeCard(props){
    const {cook_time, created_date, difficulty, image, instruction, name} = props.recipe

    const [formattedDate, setFormattedDate] = useState("")

    useEffect(() => {
        const timestamp = Date.parse(created_date)
        const backendDateObj = new Date(timestamp)

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        const formattedDateStr = backendDateObj.toLocaleDateString(undefined, options)

        setFormattedDate(formattedDateStr)
    }, [created_date])

    return (
        <div className="card w-20 md:w-40 lg:w-60 xl:w-80 bg-base-100 shadow-xl max-h-min rounded-xl">
            <div className="justify-center rounded-xl" >
                <figure className="">
                    <img src={image} alt={name} className="max-h-min object-cover md:h-full w-fit" />
                </figure>
                <div className="card-body w-fit h-fit ">
                    <h1 className="card-title justify-center text-center font-sans">{name}</h1>
                    <p className=" text-base text-center font-mono">Difficulty: {difficulty}</p>
                    <p className=" text-base text-center font-mono">Cook Time: {cook_time} Minutes</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-secondary">View More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard