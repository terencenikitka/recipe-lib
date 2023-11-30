import { NavLink, useNavigate } from "react-router-dom";
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

function NavBar({ logout, isLoggedIn }) {
    const navigate = useNavigate()
    const [theme, setTheme] = useState('autumn')
    
    const handleLoginClick = () => {
        navigate("/login")
    }
    
    const toggleTheme = () => {
        setTheme(theme === 'business' ? 'autumn' : 'business')
    }

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        }, [theme])

    const getIcon = () => {
        return theme === "mytheme" ? (
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
            <NavLink to="/signup" className="nav-link">
                Signup
            </NavLink>
            {!isLoggedIn ? 
            <button className="btn btn-primary" onClick={handleLoginClick}>Login</button> :
            <button className="btn btn-primary" onClick={logout}>Logout</button> }
            <div className="">
                <div className="form-control w-24">
                    <label className="label cursor-pointer">{getIcon()}</label>
                </div>
            </div>

        </nav>
        
    )
}




// THIS IS THE NAVBAR AND HEADER
//         |
//         |
//         V


// function NavBar({ logout, isLoggedIn }) {
//     const [sidebarHidden, setSidebarHidden] = useState(false);

//     const toggleSidebar = () => {
//         setSidebarHidden(!sidebarHidden);
//     };

//     return (
//         <div>
//             {/* top menu */}
//             <div className="navbar bg-base-100">
//             <div className="navbar-start">
//                 <span className="absolute text-white text-4xl mt-12  cursor-pointer border-solid border-2 w-10 top-7 " onClick={toggleSidebar}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 object-center ${sidebarHidden ? 'ml-8' : 'ml-1.5'}`}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
//                     </svg>
//                 </span>
//             </div>
//             <div className="text-gray-100 text-xl">
//                 <div className="pt-6 flex items-center">
//                     <i></i>
//                     <h1 className="font-bold text-gray-200 text-[40px] ml-3">ReciPlease</h1>
//                 </div>
//             </div>
//             <div className="navbar-end">
//                 <button className="btn btn-ghost btn-circle">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//                 </button>
//                 <button className="btn btn-ghost btn-circle">
//                     <div className="indicator">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
//                         <span className="badge badge-xs badge-primary indicator-item"></span>
//                     </div>
//                 </button>
//             </div>
//         </div>
//         {/* side menu */}
//             <div className='relative'>
                
//                 <span className="absolute text-white text-4xl mt-12  cursor-pointer border-solid border-2 w-10 top-7 " onClick={toggleSidebar}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 object-center ${sidebarHidden ? 'ml-8' : 'ml-1.5'}`}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
//                     </svg>
//                 </span>
                    
//                 <div className={`bg-blue-600 ${sidebarHidden ? 'hidden' : ''}`}>
//                     <div className="sidebar top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
//                         <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
//                             <i></i>
//                             <input
//                                 type="text"
//                                 placeholder="Search"
//                                 className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
//                             />
//                         </div>
//                         <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
//                             </svg>

//                             <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
//                         </div>
//                         <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//                             <i></i>
//                             <span className="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
//                         </div>
//                         <div className="my-4 bg-gray-600 h-[1px]"></div>
//                         <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//                             <i></i>
//                             <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
// </svg>


export default NavBar

