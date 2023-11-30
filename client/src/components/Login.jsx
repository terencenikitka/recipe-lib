import { useState } from "react";
import { useOutletContext,useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate()
    const login = useOutletContext()
    const [formData, setFormData] = useState({
        email: '',
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
        <div class="font-mono min-h-screen bg-gray-400 py-6 flex flex-col justify-center sm:py-12 ">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto" >
                <div class="container mx-auto bg-primary text-primary w-md absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl ">
                </div>
                <div class="container mx-auto bg-secondary text-primary w-md relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <div>
                            <h1 class="text-2xl font-semibold">Login to your Account</h1>
                        </div>
                        <div class="divide-y divide-gray-200">
                            <form onSubmit={handleLogin}>
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="relative">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="off"
                                            class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Email address"
                                        />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div class="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="off"
                                            class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Password"
                                        />
                                        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className="text-right">
                                        <button className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 mt-1.5 underline" onClick={() => navigate('/login')/*navigate to /forgot-password*/}>Forgot your password?</button>
                                    </div>
                                    <div class="relative">
                                        <button type="submit" class="btn-primary btn w-full px-4 py-2 font-bold text-white bg-blue-400 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" onClick={() => navigate('/profile')}>Sign In</button>
                                        <hr className="mb-6 border-t" />

                                        <div className="text-center">
                                            <p>Don't have an account?</p>
                                            <button className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 mt-1.5 underline" onClick={() => navigate('/login')}>Create account!</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;