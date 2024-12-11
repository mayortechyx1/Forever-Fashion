import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import Auth from "../components/Auth";
import axios from "axios";

export const backendUrl = "http://localhost:8000";

const MainLayout = () => {
  const [user, setUser] = useState(
    localStorage.getItem("client") ? localStorage.getItem("client") : ""
  );

  const status = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/auth/user-status",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setUser("user still logged in");
      }
    } catch (error) {
      console.log(error);
      setUser("");
    }
  };

  useEffect(() => {
    status();
  }, []);

  useEffect(() => {
    localStorage.setItem("client", user);
  }, [user]);

  return user === "" ? (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar user={user} />
      <Auth setUser={setUser} />
      <ToastContainer />
    </div>
  ) : (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar setUser={setUser} />
      <SearchBar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
