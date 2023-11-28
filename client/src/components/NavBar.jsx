import { NavLink } from "react-router-dom";
import "../stylesheets/NavBar.css"

function NavBar({ logout }) {
    return (
        <nav>
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>
            <NavLink to="/search" className="nav-link">
                Search
            </NavLink>
            <NavLink to="/recipes" className="nav-link">
                Recipes
            </NavLink>
            <NavLink to="/profile" className="nav-link">
                Profile
            </NavLink>
            <NavLink to="/login" className="nav-link">
                Login/Signup
            </NavLink>
            <button onClick={logout}>Logout</button>
        </nav>
    )
}

export default NavBar