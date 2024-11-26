import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const AdminLayout = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? localStorage.getItem("user") : ""
  );

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
      </div>
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default AdminLayout;
