import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";

export const backendUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";
export const currency = "$";

const AdminLayout = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? localStorage.getItem("user") : ""
  );

  const status = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/auth/admin-status",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUser("admin still logged in");
      }
    } catch (error) {
      setUser("");
    }
  };

  useEffect(() => {
    status();
  }, []);

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  return user === "" ? (
    <>
      <Login setUser={setUser} />
      <ToastContainer />
    </>
  ) : (
    <div className="bg-gray-50 min-h-screen">
      <Navbar setUser={setUser} />
      <hr />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full pl-14 pr-16">
          <Outlet context={user} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLayout;
