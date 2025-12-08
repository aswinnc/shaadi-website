import React, { useState, useContext } from "react";
import { FaStar } from "react-icons/fa6";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";



// Using placeholder images for demo if real ones aren't enough, mirroring the style
import { getRequest, baseurl, calculateAge } from "../utils/services";
import { AuthContext } from "../context/AuthContext";

const Members = () => {
  const [active, setActive] = useState(1);
  const { user: currentUser } = useContext(AuthContext);
  let buttons = [
    { id: 1, btn: "All", icon: <FaStar fontSize={25} /> },
    { id: 2, btn: "Man", icon: <IoMdMale fontSize={25} /> },
    { id: 3, btn: "Woman", icon: <IoMdFemale fontSize={25} /> },
  ];

  const [members, setMembers] = useState([]);

  React.useEffect(() => {
    const fetchMembers = async () => {
      const response = await getRequest(`${baseurl}/users`);
      if (!response.error) {
        setMembers(response);
      }
    };
    fetchMembers();
  }, []);

  const handleActive = (id) => {
    setActive(id);
  };

  const filteredGallery = members.filter((item) => {
    if (currentUser && item.id === currentUser.id) return false;
    if (active === 1) return true;
    if (active === 2) return item.gender === "male";
    if (active === 3) return item.gender === "female";
    return true;
  });

  return (
    <main className="w-full relative h-full p-10 py-20 flex flex-col items-center gap-5 justify-center">
      <h3 className="text-2xl text-white">Our Members</h3>
      <h1 className="lg:text-4xl text-2xl text-white">Start Looking For You Partner</h1>
      <p className="text-md lg:w-[50%] text-white/80 text-center">
        The beginning of a beautiful relationship is here. The ShaadiTamil is a
        great place to find potential matches. Why not start looking for your
        ideal partner online right away?
      </p>
      <div className="flex gap-3 w-full justify-center">
        {buttons.map((btn) => (
          <button
            onClick={() => handleActive(btn.id)}
            key={btn.id}
            className={`${active === btn.id
              ? "bg-white text-[#ee3a6a]"
              : "border-2 border-white text-white"
              } w-[120px] py-3 px-2 text-base text-center rounded-md flex items-center justify-center gap-1 transition-all duration-500`}
          >
            {btn.icon}
            {btn.btn}
          </button>
        ))}
      </div>

      {filteredGallery.length === 0 ? (
        <div className="text-white text-center py-10">
          <h3 className="text-xl">No members found.</h3>
        </div>
      ) : (
        <div className="grid gap-4 items-center justify-center md:grid-cols-2 grid-cols-1 lg:grid-cols-3 my-10">
          {filteredGallery.map((pic) => (
            <img
              key={pic.id}
              src={pic.profileDp || "https://via.placeholder.com/350x400"}
              alt={pic.name}
              className="w-[350px] h-[400px] object-cover rounded-md cursor-pointer hover:-translate-y-10 transition-all duration-700"
            />
          ))}
        </div>
      )}
      <button className="border-white hover:bg-white hover:text-[#ee3a6a] transition-all duration-700 border-2 px-3 py-2 lg:w-[20%] text-white rounded-md">
        View more members
      </button>
    </main>
  );
};

export default Members;
