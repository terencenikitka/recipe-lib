import { useState, useEffect, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";


const Profile = () => {
    // const {chefs} = useOutletContext()
    // const {chefId} = useParams()
    // const [chef, setChef] = useState(null)

    // useEffect(() => {
    //     const foundChef = chefs.find((c) => c.id === parseInt(chefId, 10))
    //     setChef(foundChef)
    // }, [chefId, chefs])

    const [{ data: chef, error, status }, setChef] = useState({
    data: null,
    error: null,
    status: "pending",
    });

    const { chefId } = useParams();
    console.log(chefId)

    const fetchChef = useCallback(async () => {
    const res = await fetch(`/chefs/${chefId}`);
    if (res.ok) {
        const chefJSON = await res.json();
        setChef({ data: chefJSON, error: null, status: "resolved" });
    } else {
        const chefErr = await res.json();
        setChef({ data: null, error: chefErr, status: "rejected" });
    }
    }, [chefId]);

    useEffect(() => {
    fetchChef().catch(console.error);
    }, [chefId, fetchChef]);

    console.log(chefId)
    console.log(chef)
    // console.log(chef.pic)
    
    if (!chef) {
        return <div>No chef found!</div>
    }

    return (
        <main className="profile-page w-screen">
        {/* <section className="relative block h-200-px"> */}
            {/* <div className="relative top-20 w-full h-full bg-center bg-cover">
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
            </div> */}
            {/* <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: 'translateZ(0px)' }}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
            </div> */}
        {/* </section> */}
        <section className="relative py-16 bg-base-200">
            <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-secondary-300 w-full mb-6 shadow-xl rounded-lg mt-32">
                <div className="px-6">
                <div className="flex flex-wrap justify-center">
                    
                    <img src={chef.pic} className="w-32 rounded-full" alt="Avatar" />
                    
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Recipes</span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                    {chef.first_name} {chef.last_name}
                    </h3>
                    <div className="flex items-center justify-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="self-center w-5 h-5 mr-2">
                            <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                            <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                    </svg>
                    {chef.email}
                    </div>
                </div>
                <div className="mt-10 py-10 border-t-2 border-primary text-center">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                            <h2 className="text-lg font-bold">About Me:</h2>
                            <p className="mb-4 mt-2 text-md leading-relaxed text-blueGray-700">
                            {chef.bio}
                            </p>
                            
                        </div>
                    </div>
                </div>
                <div className="mt-6 py-10 border-t-2 border-primary text-center">
                    <button className="btn btn-ghost txt-rose-950 border-primary">My Recipes</button>
                </div>
                </div>
            </div>
            </div>
            
        </section>
        </main>
    );
};

export default Profile;



// const [{ data: chef, error, status }, setChef] = useState({
//     data: null,
//     error: null,
//     status: "pending",
//   });
//   const [showEdit, setShowEdit] = useState(false);

//   const { id } = useParams();

//   const fetchChef = useCallback(async () => {
//     const res = await fetch(`/chefs/${id}`);
//     if (res.ok) {
//       const chefJSON = await res.json();
//       setChef({ data: chefJSON, error: null, status: "resolved" });
//     } else {
//       const chefErr = await res.json();
//       setChef({ data: null, error: chefErr, status: "rejected" });
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchChef().catch(console.error);
//   }, [id, fetchChef]);