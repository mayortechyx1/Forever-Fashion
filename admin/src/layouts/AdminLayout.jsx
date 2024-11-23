import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";

const AdminLayout = () => {
  const [token, setToken] = useState("");
  return token === "" ? (
    <Login />
  ) : (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <hr />
      <div className="flex w-full">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
