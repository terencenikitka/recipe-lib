import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Signup(){
    
    const [newChefFirstName, setNewChefFirstName] = useState('')
    const [newChefLastName, setNewChefLastName] = useState('')
    const [newChefEmail, setNewChefEmail] = useState('')
    const [newChefPassword, setNewChefPassword] = useState('')
    const [newChefPic, setNewChefPic] = useState('')
    const [newChefBio, setNewChefBio] = useState('')
    const [file, setFile] = useState()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const navigate = useNavigate()

    function handlePhotoChange(e) {
        console.log(e.target.files[0].name)
        setFile(URL.createObjectURL(e.target.files[0]))
        setNewChefPic(e.target.files[0].name)
    }

    useEffect(() => {
        setPasswordsMatch(newChefPassword === confirmPassword)
    }, [newChefPassword, confirmPassword])

    const newChefData = {
        first_name: newChefFirstName,
        last_name: newChefLastName,
        email: newChefEmail,
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
            .then((r) => r.json()).catch((error) => {console.error('POST error', error)})
            
            .then(() => {
                navigate('/profile');
            })
            ;
    }

    return (
        <div className="container flex   font-mono max-w-2xl  ">
            
            <div className=" mx-auto bg-neutral text-primary max-w ">
                <div className="my-12">
                    
                    <div className="  ">

                        <div className="w-fill bg-white p-1 rounded-lg lg:rounded-l-none ">
                            <div className="text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary underline decoration-solid">
                                <h3 className="pt-1 text-4xl uppercase font-bodoni-moda font-extrabold  text-center text-transparent">Create an Account</h3>
                            </div>
                            <form className="px-12 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                                <div className="mb-4 ">
                                    <div className="mb-5">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                            First Name
                                        </label>
                                        <input
                                            className="w-max px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="firstName"
                                            type="text"
                                            placeholder="First Name" required onChange={(e) => setNewChefFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" for="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            className="w-max px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"
                                            placeholder="Last Name" required onChange={(e) => setNewChefLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-max:content px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email" required onChange={(e) => setNewChefEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4 md:flex md:justify-stretch">
                                    <div className="mb-4 md:mr-0 md:mb-0 ">
                                        <label className="mb-2 text-sm font-bold text-gray-700 " for="password" >Password
                                        </label>
                                        <input
                                            className="w-max  text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************" required value={newChefPassword}
                                            onChange={(e) => setNewChefPassword(e.target.value)}
                                        />
                                        
                                    </div>
                                    <div className="md:ml-2">
                                        <label className=" mb-2 text-sm font-bold text-gray-700" for="c_password">
                                            Confirm Password
                                        </label>
                                        <input
                                            className=" px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline max-w-max"
                                            id="c_password"
                                            type="password"
                                            placeholder="******************" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        
                                    </div>
                                    
                                </div>
                                <div className="flex">
                                        {!passwordsMatch && <p className="w-2/3 h-full px-4 py-2 mb-3 text-xs text-center italic text-gray-light bg-error shadow-md rounded-md self-stretch ml-10">Password confirmation does not match!</p>}
                                </div>
                                <div>
                                    <label className="block mb-4 text-sm font-bold text-gray-700 custom-file-upload" for="prof_pic">Upload a Profile Pic </label>
                                    <div className="">
                                        <input className="file-input file-input-bordered file-input-info file-input-sm w-full max-w-xs text-sm" type="file" onChange={handlePhotoChange}></input>
                                        <img className="rounded-md drop-shadow-md" src={file} />
                                    </div>
                                    <label className="block mb-4 text-sm font-bold text-gray-700 pt-7">
                                        <span className="mb-1">About Me</span>
                                        <textarea rows="3" className="block w-full rounded-md focus:ring focus:ri focus:ri dark:bg-gray-800 mt-3 text-sm" placeholder="Tell us a bit about yourself!" onChange={(e) => setNewChefBio(e.target.value)}></textarea>
                                    </label>
                                    
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="btn-primary btn w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit" disabled={!passwordsMatch}
                                    >
                                        Register Account
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                
                                <div className="text-center">
                                    <p>Already have an account?</p>
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 mt-1.5 underline"
                                        onClick={() => navigate('/login')}
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