import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../layouts/MainLayout";

const Navbar = ({ user, setUser }) => {
  const [visible, setVisible] = useState(false);
  const { showSearch, setShowSearch, getCartCount } = useContext(shopContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUser("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>
      {user !== "" && (
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>
      )}

      {/* Search bar and user-menu */}
      {user !== "" && (
        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(!showSearch)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          <div className="group relative">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <Link to="">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                </Link>
                <Link to="/orders">
                  <p className="cursor-pointer hover:text-black">Orders</p>
                </Link>
                <Link
                  onClick={() => {
                    logoutHandler();
                  }}
                >
                  <p className="cursor-pointer hover:text-black">Logout</p>
                </Link>
              </div>
            </div>
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt=""
          />
        </div>
      )}

      {/* Sidebar menu for small screens */}
      {user !== "" && (
        <div
          className={`mobile-menu absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt=""
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              to="/"
              className="py-2 pl-6 border"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/collection"
              className="py-2 pl-6 border"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/about"
              className="py-2 pl-6 border"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/contact"
              className="py-2 pl-6 border"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
