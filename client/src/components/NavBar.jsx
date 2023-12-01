import { NavLink, useNavigate } from "react-router-dom";
import "../stylesheets/NavBar.css"
import { themeChange } from 'theme-change'
import { useState, useEffect } from "react";

const moonIcon = (
    <svg 
        className="h-6 w-6"
        fill="none"  
        viewBox="0 0 15 15" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M1.66077 11.3619C2.09296 11.4524 2.54093 11.5 3.00002 11.5C6.58987 11.5 9.50002 8.58987 9.50002 5.00002C9.50002 3.25482 8.81224 1.67027 7.69295 0.502625C11.4697 0.604839 14.5 3.69855 14.5 7.50002C14.5 11.366 11.366 14.5 7.49999 14.5C5.06138 14.5 2.91401 13.253 1.66077 11.3619Z" stroke="black" stroke-linejoin="round"/>
    </svg>
);

const sunIcon = (
    <svg
        className="h-6 w-6"
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

// function NavBar({ logout, isLoggedIn }) {
//     const navigate = useNavigate()
//     const [theme, setTheme] = useState('myLight')
    
//     const handleLoginClick = () => {
//         navigate("/login")
//     }
    
//     const toggleTheme = () => {
//         setTheme(theme === 'myDark' ? 'myLight' : 'myDark')
//     }

//     useEffect(() => {
//         document.querySelector('html').setAttribute('data-theme', theme);
//         }, [theme])

//     const getIcon = () => {
//         return theme === "mytheme" ? (
//             <div onClick={toggleTheme}>{sunIcon}</div>
//         ) : (
//             <div onClick={toggleTheme}>{moonIcon}</div>
//         );
//     };

//     return (
//         <nav>
//             <NavLink to="/" className="nav-link">
//                 Home
//             </NavLink>
            
            

            <NavLink to="/signup" className="nav-link">
                Signup
            </NavLink>
            

//         </nav>
        
//     )
// }


{/* <div className="">
    <div className="form-control w-24">
        <label className="label cursor-pointer">{getIcon()}</label>
    </div>
</div> */}

// THIS IS THE NAVBAR AND HEADER
//         |
//         |
//         V


function NavBar({ logout, isLoggedIn }) {

    const navigate = useNavigate()
    const [theme, setTheme] = useState('myLight')
    
    const handleLoginClick = () => {
        navigate("/login")
    }
    
    const toggleTheme = () => {
        setTheme(theme === 'myDark' ? 'myLight' : 'myDark')
    }

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        }, [theme])

    const getIcon = () => {
        return theme === "myDark" ? (
            <div onClick={toggleTheme}>{sunIcon}</div>
        ) : (
            <div onClick={toggleTheme}>{moonIcon}</div>
        );
    };

    return(
        <div className="navbar bg-base-100 fixed z-50">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><NavLink to="/" className="nav-link">Home</NavLink></li>
                <li><NavLink to="/recipes" className="nav-link">Recipes</NavLink></li>
                <li><NavLink to="/profile/1" className="nav-link">Profile</NavLink></li>
                <li className="border-b"></li>
                <li>
                   {!isLoggedIn ? <NavLink to="/login" className="nav-link">Login</NavLink> : <span onClick={logout}>Logout</span>}
                </li>
                <li><NavLink to="/signup" className="nav-link">Signup</NavLink></li>
                <li><a>Settings</a></li>
            </ul>
            </div>
        </div>
        <div className="navbar-center">
            
            <a className="btn btn-ghost text-xl">
                <NavLink to="/" className="nav-link">GitGrub</NavLink>
            </a>
        </div>
        <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
                <NavLink to="/search" className="nav-link">   
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </NavLink>
            </button>
            <button className="btn btn-ghost btn-circle">
                <label className="label cursor-pointer">{getIcon()}</label>
            </button>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-1">
                <div className="w-auto rounded-full">
                    <NavLink to="/profile/1" className="nav-link">
                        <img alt="ProfilePicture" src="https://i.imgur.com/VjpOtNM.jpg" />
                    </NavLink>
                    
                </div>
            </div>
            
        </div>
        </div>
    );

};

// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
// <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
// </svg>


export default NavBar

