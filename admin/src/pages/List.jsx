import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../layouts/AdminLayout";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/product/list",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setList(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(res.response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/product/delete",
        { productId: id },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const confirmDeletion = (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteProduct(id),
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  useEffect(() => {
    fetchList();
  }, [deleteProduct]);
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
        {list.map((prod, index) => (
          <div
            key={index}
            className="rounded-sm hover:bg-gray-300 grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img className="w-12" src={assets.upload_area} alt="" />
            <p>{prod.name}</p>
            <p>{prod.category}</p>
            <p>
              {currency}
              {prod.price}
            </p>
            <p
              onClick={() => confirmDeletion(prod._id)}
              className="text-right md:text-center rounded-md cursor-pointer text-lg transition hover:scale-105 hover:bg-gray-400 active:scale-95 "
            >
              x
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
