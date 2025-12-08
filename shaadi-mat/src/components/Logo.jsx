import React from "react";
import Brand from "../assets/Logo.png";

import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <img
      src={Brand}
      className="lg:w-44 w-[100px] pt-2 cursor-pointer"
      onClick={() => navigate("/")}
    />
  );
};

export default Logo;
