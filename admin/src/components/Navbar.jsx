import React from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";

const Navbar = ({ setUser }) => {
  const logoutHandler = async () => {
    try {
      const res = await axios.post(backendUrl + "/api/auth/logout");
      setUser("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} className="w-[180px]" alt="" />
      <button
        onClick={logoutHandler}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
