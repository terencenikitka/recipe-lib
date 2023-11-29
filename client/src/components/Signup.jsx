import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Signup(){
    
    const [newChefName, setNewChefName] = useState('')
    const [newChefPassword, setNewChefPassword] = useState('')
    const [newChefPic, setNewChefPic] = useState('')
    const [newChefBio, setNewChefBio] = useState('')
    const [file, setFile] = useState()
    const navigate = useNavigate()

    function handlePhotoChange(e) {
        console.log(e.target.files[0].name)
        setFile(URL.createObjectURL(e.target.files[0]))
        setNewChefPic(e.target.files[0].name)
    }
  

    const newChefData = {
        name: newChefName,
        password: newChefPassword,
        bio: newChefBio,
        pic: newChefPic
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://127.0.0.1:5555/chefs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newChefData),
        })
            .then((r) => r.json())
            .then(() => console.log(newChefData))
            .then(() => {
                navigate('/profile');
            });
    }

    return (
        <div className="font-mono bg-gray-400 max-w-2xl">
            
            <div className="container mx-auto bg-secondary text-primary w-md">
                <div className="flex my-12 items-stretch">
                    
                    <div className=" xl:w-3/4 lg:w-11/12 flex-1 justify-center items-stretch">

                        <div className="w-7/12 bg-white p-1 rounded-lg lg:rounded-l-none items-stretch">
                            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                                <div className="mb-4 md:flex md:justify-center">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                            First Name
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="firstName"
                                            type="text"
                                            placeholder="First Name" required onChange={(e) => setNewChefName(e.target.value)}
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" for="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" for="password" >
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************" required
                                            onChange={(e) => setNewChefPassword(e.target.value)}
                                        />
                                        <p className="text-xs italic text-red-500">Please choose a password.</p>
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                                            Confirm Password
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="c_password"
                                            type="password"
                                            placeholder="******************"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-4 text-sm font-bold text-gray-700 custom-file-upload" for="prof_pic">Upload a Profile Pic </label>
                                    <div className="flex items-center">
                                        <input className="file-input file-input-bordered file-input-info file-input-sm w-full max-w-xs text-sm" type="file" onChange={handlePhotoChange}></input>
                                        <img className="ml-10" src={file} />
                                    </div>
                                    <label className="block mb-4 text-sm font-bold text-gray-700 pt-7">
                                        <span className="mb-1">About Me</span>
                                        <textarea rows="3" className="block w-full rounded-md focus:ring focus:ri focus:ri dark:bg-gray-800 mt-3 text-sm" placeholder="Tell us a bit about yourself!" onChange={(e) => setNewChefBio(e.target.value)}></textarea>
                                    </label>
                                    
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="btn-primary btn w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Register Account
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                
                                <div className="text-center">
                                    <p>Already have an account?</p>
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 mt-1.5 underline"
                                        href="#"
                                    >
                                        Login!
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;