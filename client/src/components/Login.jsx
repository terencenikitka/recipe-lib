import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Login(){

    const login = useOutletContext()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    function handleLogin(e) {
        e.preventDefault()
        login()
    }

    return (
        <div>
            <h1>Welcome back!</h1>
            <form onSubmit={handleLogin}>
                <label for="username">Username</label>
                <div>
                    <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    />
                </div>
                <label for="password">Password</label>
                <div>
                    <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;