import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

export const backendUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AdminLayout />}>
        <Route path="/add" element={<Add />} />
        <Route path="/list" element={<List />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
