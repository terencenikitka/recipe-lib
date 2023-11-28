import { NavLink } from "react-router-dom";
import "../stylesheets/NavBar.css"
import { themeChange } from 'theme-change'
import { useState, useEffect } from "react";

const moonIcon = (
    <svg
        className="h-10 w-10 text-yellow-400"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12" />
    </svg>
);

const sunIcon = (
    <svg
        className="h-10 w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

function NavBar({ logout }) {
    const [theme, setTheme] = useState('retro')
    const toggleTheme = () => {
        setTheme(theme === 'luxury' ? 'retro' : 'luxury')
    }

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        }, [theme])

    const getIcon = () => {
        return theme === "luxury" ? (
            <div onClick={toggleTheme}>{sunIcon}</div>
        ) : (
            <div onClick={toggleTheme}>{moonIcon}</div>
        );
    };

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
            <button className="btn btn-primary" onClick={logout}>Logout</button>
            <div className="">
                <div className="form-control w-24">
                    <label className="label cursor-pointer">{getIcon()}</label>
                </div>
            </div>

        </nav>
    )
}

export default NavBar

