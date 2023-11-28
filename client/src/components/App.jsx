import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  const login = () => {
    setIsLoggedIn(true)
  }
  const logout = () => {
    setIsLoggedIn(false)
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [isLoggedIn])

  return ( 
    <div>
      <header>
      {isLoggedIn ? <NavBar logout={logout}/> : <Navigate to="/login" />}  
      </header>
      <Outlet context={login}/>
      
    </div>
    
);
}

export default App;
