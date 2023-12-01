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
        <div className="container flex bg-base-100  font-sans-serif max-w-2xl  ">
            
            <div className=" mx-auto bg-accent-content text-neutral-content max-w ">
                <div className="my-12 mb-8">
                    
                    <div className="  ">

                        <div className="w-fill p-1 rounded-lg lg:rounded-l-none ">
                            <div className="text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary-content to-primary-content underline decoration-solid pb-4">
                                <h1 id="signup-h1" className="pt-1 uppercase font-bodoni-moda font-extrabold  text-center text-transparent text-4xl max-w-none tracking-widest ">Create  an  Account</h1>
                            </div>
                            <form className="px-12 pt-6 pb-8 mb-4 rounded" onSubmit={handleSubmit}>
                                
                                <div className="mb-2 flex ">
                                    <div className="mb-4">
                                        <label className="mb-2 text-lg font-bold " for="firstName" > First Name
                                        </label>
                                        <input
                                            className="w-max px-3 py-2 mt-2 text-md italic leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="firstName"
                                            type="text"
                                            placeholder="First Name" required value={newChefFirstName}
                                            onChange={(e) => setNewChefFirstName(e.target.value)}
                                        />
                                        
                                    </div>
                                    <div className="">
                                        <label className=" mb-2 mr-20 text-lg font-bold" for="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            className=" w-max px-3 py-2 mt-2 text-md italic leading-tight rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"
                                            placeholder="Last Name" required value={newChefLastName} onChange={(e) => setNewChefLastName(e.target.value)}
                                        />  
                                    </div>
                                    
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-lg font-bold" for="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-max px-3 py-2 text-md italic leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email" required onChange={(e) => setNewChefEmail(e.target.value)}
                                    />
                                </div>
                                
                                <div className="mb-4 md:flex md:justify-stretch">
                                    <div className="mb-4">
                                        <label className="mb-2 text-lg font-bold " for="password" > Password
                                        </label>
                                        <input
                                            className="w-max px-3 py-2 mt-2 text-md italic leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="*****" required value={newChefPassword}
                                            onChange={(e) => setNewChefPassword(e.target.value)}
                                        />
                                        
                                    </div>
                                    <div className="">
                                        <label className=" mb-2 text-lg font-bold" for="c_password">
                                            Confirm Password
                                        </label>
                                        <input
                                            className=" w-max px-3 py-2 mt-2 text-md italic leading-tight rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="c_password"
                                            type="password"
                                            placeholder="*****" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        
                                    </div>
                                    
                                </div>
                                <div className="flex">
                                        {!passwordsMatch && <p className="w-2/3 h-full px-4 py-3 mb-3 mt-0 text-md text-center italic text-gray-light bg-error shadow-md rounded-md self-stretch ml-10">Password confirmation does not match!</p>}
                                </div>
                                <div>
                                    <label className="block mb-3 mt-0 text-lg font-bold" for="prof_pic">Upload a Profile Picture </label>
                                    <div className="">
                                        <input className="w-max px-3 py-2 text-md italic leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Picture URL" onChange={handlePhotoChange}></input>
                                        <img className="rounded-md drop-shadow-md" src={file} />
                                    </div>
                                    <label className="block mb-3 text-lg font-bold pt-5">
                                        About Me </label>
                                        <textarea rows="3" className="w-full px-3 py-2 mb-4 text-md italic leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Tell us a bit about yourself!" onChange={(e) => setNewChefBio(e.target.value)}></textarea>
                                    
                                    
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="hover:btn-secondary bg-primary  btn max-w px-6 py-2 my-3 text-xl hover:text-primary-content text-secondary-content  rounded-md border-none font-poppins font-bold shadow-md shadow-gray-dark"
                                        type="submit" disabled={!passwordsMatch}
                                    >
                                        Register Account
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                
                                <div className="text-center text-md mb-">
                                    <p>Already have an account? 
                                    <a
                                        className="inline-block align-baseline hover:text-blue-800 mt-1.5 underline font-bold"
                                        onClick={() => navigate('/login')}
                                    >
                                        Login!
                                    </a>
                                    </p>
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