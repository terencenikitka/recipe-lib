import App from "./components/App";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Recipes from "./components/Recipes";
import Search from "./components/Search";
import Signup from "./components/Signup";


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
                element: <Profile />,
                children: [
                    {
                        path: ':chefId',
                        element: <Profile />
                    }
                ]
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/signup",
                element: <Signup />
            }
        ]
    }
]

export default routes;