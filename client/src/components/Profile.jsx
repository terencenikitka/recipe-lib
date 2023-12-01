import { useState, useEffect, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";


import { Carousel } from 'flowbite-react';


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
                    <h1 className="text-5xl font-bodoni-moda font-bold mb-4 pt-5 text-center text-primary-content">My Favorite Recipes</h1>
                </div>
                <div className="flex justify-center pb-12">
                <div className="w-1/2 h-56 sm:h-64 xl:h-80 2xl:h-96">
                    <Carousel>
                        <img src="https://fitfoodiefinds.com/wp-content/uploads/2023/03/Sushi-Burrito-sq.jpg" alt="sushi" />
                        <img src="https://www.thespruceeats.com/thmb/wiFS2z1vLTt3fHKDVaka5KiWshI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/basic-cherry-pie-recipe-995136-14-dfe79487adf64a848a49dd07983b6614.jpg" alt="pie" />
                        <img src="https://image-tc.galaxy.tf/wijpeg-dkpe8fjn7i96wvpe4lsnrh7sz/crawfish-season-new-orleans_standard.jpg?crop=56%2C0%2C889%2C667" alt="crawfish" />
                        <img src="https://assets.bonappetit.com/photos/5c2f8fe26558e92c8a622671/1:1/w_2700,h_2700,c_limit/bolognese-1.jpg" alt="bolognse" />
                        <img src="https://www.inspiredtaste.net/wp-content/uploads/2016/06/Vietnamese-Pho-Soup-Recipe-1.jpg" alt="pho" />
                    </Carousel>
                    </div>
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