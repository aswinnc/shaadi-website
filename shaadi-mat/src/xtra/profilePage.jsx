import { useParams } from "react-router-dom";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getRequest, baseurl, calculateAge } from "../utils/services";

export default function Profiles() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getRequest(`${baseurl}/users/${id}`);
                if (!response.error) {
                    setUser(response);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading profile...</div>;
    if (!user) return <div className="p-10 text-center">User not found</div>;

    return (
        <div className="min-h-screen w-full p-5">
            <div className="h-[200px] bg-[url('https://www.transparenttextures.com/patterns/p5.png')] w-full flex justify-center items-center flex-col">
                <h1 className="font-Libre tracking-wide text-5xl">Profile Details</h1>
            </div>

            <div className="flex flex-col md:flex-row h-full gap-10 shadow-xl rounded-3xl w-full p-10">
                <div className="w-full md:w-[40%] space-y-5 flex flex-col items-center md:items-start">
                    <img
                        src={user.profileDp || "https://via.placeholder.com/250x300"}
                        className="h-[300px] w-[250px] object-cover rounded-lg"
                        alt="Profile"
                    />
                    <div className="flex flex-col items-center md:items-start">
                        <p className="text-lg font-semibold">Matri Id</p>
                        <p className="font-inter text-xl py-2 w-[250px]">SHAADITAMIL{user.id}</p>

                        <button className="bg-pink-700 font-inter text-xl text-white py-2 w-[250px] rounded hover:bg-pink-800 transition" onClick={() => alert("Request Sent!")}>Send Request</button>
                        <div className="flex gap-2 w-[250px] mt-2">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 font-inter text-lg text-white py-2 rounded hover:bg-blue-600 transition" onClick={() => alert("Opening Chat...")}>
                                <FaEnvelope /> Message
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 font-inter text-lg text-white py-2 rounded hover:bg-green-600 transition" onClick={() => window.location.href = `tel:${user.mobile || ""}`}>
                                <FaPhone /> Call
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[60%] font-inter space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left">{user.name?.toUpperCase()}</h1>
                    <p className="text-xl text-center md:text-left text-gray-600">{user.job?.toUpperCase() || "OCCUPATION N/A"}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-lg">
                        <p><strong>Location:</strong> {user.city || user.address}, {user.state}, {user.country}</p>
                        <p><strong>Age:</strong> {user.dob ? `${calculateAge(user.dob)} Yrs` : "N/A"}</p>
                        <p><strong>Marital Status:</strong> {user.maritalStatus || "N/A"}</p>
                        <p><strong>Religion:</strong> {user.religion || "N/A"}</p>
                        <p><strong>Caste:</strong> {user.caste || "N/A"}</p>
                        <p><strong>Mother Tongue:</strong> {user.motherTongue || "N/A"}</p>
                        <p><strong>Height:</strong> {user.height || "N/A"}</p>
                        <p><strong>Salary:</strong> {user.salary || "N/A"}</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold mb-2">About</h3>
                        <p className="text-gray-700 leading-relaxed">{user.Description || "No description provided."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}