import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RecipeCardPage({recipeData, chef_id}) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false); 
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(id){
    fetch(`http://127.0.0.1:5555/recipes/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        }
        throw new Error("Failed to fetch recipe");
      })
      .then((recipeData) => {
        const formattedDate = new Date(recipeData.created_date)
          .toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        recipeData.formattedDate = formattedDate
        console.log(recipeData)
        setRecipe(recipeData);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  
   
    fetch(`http://127.0.0.1:5555/comments?recipe_id=${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch comments");
      })
      .then((commentsData) => {
        setComments(commentsData);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
    }
  }, [id, commentInput]); 



  function handleBack() {
    navigate(`/recipes`);
  }

  function handleCommentSubmit() {
    const createdDate = new Date();
    const formattedDate = createdDate.toISOString().replace('T', ' ').replace('Z', '');
  
    fetch("http://127.0.0.1:5555/chefs")
      .then((response) => response.json())
      .then((chefs) => {
        const randomChef = chefs[Math.floor(Math.random() * chefs.length)];
  
        fetch("http://127.0.0.1:5555/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment_text: commentInput,
            chef_id: randomChef.id,
            recipe_id: id,
          }),
        })
          .then((r) => r.json())
          .catch((error) => {
            console.error('POST error', error);
          })
          .then(() => {
            setCommentInput("");
          });
      })
      .catch((error) => {
        console.error('Error fetching chefs', error);
      });
  }
  
  function handleShowComments() {
   
    setShowComments(!showComments);
  }



  return (
    <>
      {recipe && (
        <div className="mt-12 mb-6 ml-12 mr-18 w-screen shadow-xl rounded-xl">
          <div className="w-fill rounded-xl">
            <figure className="flex mt-6">
              <img src={recipe.image} alt={recipe.name} className="h-64 w-64" />
            </figure>
            <div className="card-body w-fit h-fit ">
              <h1 className="card-title justify-center text-center font-sans">{recipe.name}</h1>
              <p className="text-sm">Created by {recipe.chef_id} on {recipe.formattedDate}</p>
              <p className="text-base text-center font-mono">Difficulty: {recipe.difficulty}</p>
              <p className="text-base text-center font-mono">Cook Time: {recipe.cook_time} Minutes</p>
              <h1 className="card-title justify-center text-center font-sans">{recipe.instruction}</h1>
              <div className="card-actions justify-center">
                <div className="mb-4">
                  <label className="text-sm text-gray-600">Add a Comment:</label>
                  <textarea
                    className="border p-2 w-full"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleCommentSubmit}>
                  Add Comment
                </button>
                <button className="btn btn-secondary" onClick={handleBack}>
                  Go back
                </button>
                <button className="btn btn-secondary" onClick={handleShowComments}>
                  {showComments ? "Hide Comments" : "Show Comments"}
                </button>
              </div>
                    {showComments && (
                      <div>
                        <h2 className="text-xl font-bold mb-2">Comments:</h2>
                        <ul>
                          {comments.map((comment) => (
                            <li key={comment.id} className="mb-2">
                              <strong>{comment.chef_first_name} {comment.chef_last_name}</strong>: {comment.comment_text}
                              <p>Created on: {comment.created_date}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeCardPage;
