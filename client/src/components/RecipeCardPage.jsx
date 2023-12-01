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
        <div className="flex align-center justify-center mt-16 mb-6  w-screen rounded-xl">
          <div className="w-1/2 rounded-xl card">
            <figure className="mt-6">
              <img src={recipe.image} alt={recipe.name} className="h-64 w-64" />
            </figure>
            <div className="card-body ">
              <h1 className="text-3xl font-bodoni-moda justify-center text-center">{recipe.name}</h1>
              <p className="text-sm text-center font-mono">Created on {recipe.formattedDate}</p>
              <p className="text-base text-center font-mono">Difficulty: {recipe.difficulty}</p>
              <p className="text-base text-center font-mono border-b">Cook Time: {recipe.cook_time} Minutes</p>
              <p className="text-base justify-center text-center font-mono mb-5 mt-2">{recipe.instruction}</p>
              <div className="">
               <div className="flex mb-8">
                <div className="mb-4 w-1/2 mx-12">
                  
                  <textarea
                    className="border p-2 w-full text-xs font-mono" 
                    placeholder="Add a Comment"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                </div>
                <div className="mb-4 w-1/2 ">
                <button className="btn btn-primary max-w" onClick={handleCommentSubmit}>
                  Add Comment
                </button>
                </div>
                </div>
                <div className="flex mb-6 ">
                <button className="hover:btn-secondary bg-primary  btn max-w px-6 py-2 my-3 text-xl hover:text-primary-content text-secondary-content  rounded-md border-none font-poppins font-bold shadow-md shadow-gray-dark mx-12" onClick={handleBack}>
                  Go back
                </button>
                <button className="hover:btn-secondary bg-primary  btn max-w px-6 py-2 my-3 text-xl hover:text-primary-content text-secondary-content  rounded-md border-none font-poppins font-bold shadow-md shadow-gray-dark" onClick={handleShowComments}>
                  {showComments ? "Hide Comments" : "Show Comments"}
                </button>
                </div>
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
