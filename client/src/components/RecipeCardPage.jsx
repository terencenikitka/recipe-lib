import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";

function RecipeCardPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false); // Step 1
  const [comments, setComments] = useState([]); // Additional state for comments
  const navigate = useNavigate();

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
  
    // Fetch comments when the recipe is loaded
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
  }, [id, commentInput]); // Add commentInput as a dependency



  function handleBack() {
    navigate(`/recipes`);
  }

  function handleCommentSubmit() {
    // Convert the comment created_date to a JavaScript Date object
    const createdDate = new Date();
    const formattedDate = createdDate.toISOString().replace('T', ' ').replace('Z', '');

    fetch("http://127.0.0.1:5555/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_text: commentInput,
        chef_id: 1,
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
  }

  function handleShowComments() {
    // Toggle the display of comments
    setShowComments(!showComments);
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
