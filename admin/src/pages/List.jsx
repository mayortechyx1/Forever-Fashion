import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../layouts/AdminLayout";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(
        backendUrl + "/api/product/list",
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setList(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(res.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchList();
    console.log(list.slice(0, 3));
  }, []);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* --------List Table Title------------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------List of products------- */}
      </div>
    </>
  );
};

export default List;
