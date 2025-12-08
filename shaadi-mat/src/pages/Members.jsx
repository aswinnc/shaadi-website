import React from "react";
import { BsSearchHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getRequest, baseurl } from "../utils/services";

import cover from "../assets/members/cover.jpg";
import shape from "../assets/home/curved.svg";



const Members = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getRequest(`${baseurl}/users`);
        if (!response.error) {
          setUsers(response);
        }
      } catch (error) {
        console.error("Failed to fetch members", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section>
        <main
          className="main-container relative w-full min-h-[120vh] overflow-hidden -z-10 mt-[-20%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${cover})` }}
        >
          <div className="overlay"></div>
          <img
            src={shape}
            className="w-full bg-cover bg-no-repeat absolute mt-[52.7%] z-10 -pl-5"
          />
        </main>
        <div className="absolute top-[30%] mx-32 flex justify-center items-center">
          {/* border-pink-300 border-2*/}
          <div className=" backdrop-blur-sm w-full gap-3 p-16 rounded-md duration-75 mb-5 flex justify-center items-center flex-col">
            <h4 className="text-2xl font-semibold text-white">Our Members</h4>
            <h className="text-5xl text-white uppercase font-bold">
              start looking for your partner
            </h>
            <p className="text-base text-white w-[50%] text-center mt-2">
              Our Members Search your match based on your interests and don’t
              hesitate to approach them first. Interact with as many people as
              possible.
            </p>
          </div>
        </div>
      </section>
      <section className="px-32 w-full">
        <div className="flex items-center justify-center gap-3 my-10">
          <input
            placeholder="Search your match..."
            type="text"
            className=" bg-white rounded-md focus:bg-[#d8608090] border-[1px] border-gray-300 outline-none focus:border-[#ee3a6a] px-3 py-2 w-[50%]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-[#ee3a6a] p-3 rounded-md text-center">
            <BsSearchHeart fontSize={20} className="text-md text-white" />
          </button>
        </div>
      </section>
      <section className="bg-[#ffffff] min-h-[120vh] flex flex-col justify-center items-center px-20 mb-10">
        <div className="grid grid-cols-3 items-center justify-center gap-2 p-10">
          {loading ? (
            <div className="col-span-3 text-center text-gray-500">Loading members...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No members found matching "{searchTerm}".</div>
          ) : (
            filteredUsers.map((user) => (
              <Link to={`/profiles/${user.id}`} key={user.id}>
                <img
                  src={user.profileDp || "https://via.placeholder.com/350x400"}
                  className="w-full object-cover rounded-lg cursor-pointer hover:-translate-y-10 transition-all duration-700 h-[400px]"
                />
                <div className="text-center mt-2">
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.job || "Member"}</p>
                </div>
              </Link>
            ))
          )}
        </div>
        <button className="border-[#ee3a6a] hover:bg-[#ee3a6a] hover:text-white transition-all duration-700 border-[1px] px-3 py-2 w-[20%] text-[#ee3a6a] rounded-md">
          View more members
        </button>
      </section>
    </>
  );
};

export default Members;
