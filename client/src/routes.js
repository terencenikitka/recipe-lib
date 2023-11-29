import App from "./components/App";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Recipes from "./components/Recipes";
import Search from "./components/Search";
import Signup from "./components/Signup";
import RecipeCardPage from "./components/RecipeCardPage";
import RecipeCard from "./components/RecipeCard";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/recipes",
                element: <Recipes />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path:`/recipes/:id`,
                element: <RecipeCardPage />
            }
        ]
    }
]

export default routes;