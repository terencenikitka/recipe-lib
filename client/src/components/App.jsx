import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import "../index.css"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false)
  const navigate = useNavigate()

  const login = () => {
    setIsLoggedIn(true)
  }
  const logout = () => {
    setIsLoggedIn(false)
    setShowLogoutAlert(true)
  }
  const context = {
    login,
    setUser
  }
  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    if (isLoggedIn) {
      navigate("/", {replace: true})
    }}, [isLoggedIn])


  return ( 
    <div className="bg-base-100 flex">
      <header>
        <NavBar isLoggedIn={isLoggedIn} logout={logout} login={login} />  
      </header>
      {showLogoutAlert && (
        <div role="alert" className={`alert alert-success custom-alert ${showLogoutAlert ? 'fadeout' : 'fadein'}`} onAnimationEnd={() => setShowLogoutAlert(false)} style={{display: showLogoutAlert ? 'block': 'none'}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>You have been successfully logged out!</span>
        </div>
      )}
      <div className="flex-1">
        <Outlet context={context}/>
      </div>
      
      
    </div>
    
);
}

export default App;



// w-max mx-auto alert-box transition-opacity duration-1000 ease-in-out opacity-100
