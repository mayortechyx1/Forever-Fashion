import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../layouts/AdminLayout";
import { toast } from "react-toastify";

const Add = () => {
  const user = useOutletContext();

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [type, setType] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("category", category);
    form.append("type", type);
    form.append("bestseller", bestseller);
    form.append("sizes", sizes);

    image1 && form.append("image1", image1);
    image2 && form.append("image2", image2);
    image3 && form.append("image3", image3);
    image4 && form.append("image4", image4);

    try {
      const res = await axios.post(backendUrl + "/api/product/add", form, {
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  // useEffect(() => {
  //   console.log(bestseller);
  // }, [bestseller]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3 mt-3"
    >
      <div>
        <p className="flex gap-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 transition hover:scale-105 active:scale-95 cursor-pointer"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 transition hover:scale-105 active:scale-95 cursor-pointer"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 transition hover:scale-105 active:scale-95 cursor-pointer"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 transition hover:scale-105 active:scale-95 cursor-pointer"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div>
        <p>Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>
        <p>Product description</p>
        <textarea
          className="w-full max-w-[900px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                !prev.includes("S")
                  ? [...prev, "S"]
                  : prev.filter((item) => item !== "S")
              )
            }
          >
            <p
              className={
                sizes.includes("S")
                  ? `text-white bg-black transition active:scale-95 px-3 py-1 cursor-pointer`
                  : "bg-slate-200 px-3 py-1 cursor-pointer"
              }
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                !prev.includes("M")
                  ? [...prev, "M"]
                  : prev.filter((item) => item !== "M")
              )
            }
          >
            <p
              className={
                sizes.includes("M")
                  ? `text-white bg-black transition active:scale-95 px-3 py-1 cursor-pointer`
                  : "bg-slate-200 px-3 py-1 cursor-pointer"
              }
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                !prev.includes("L")
                  ? [...prev, "L"]
                  : prev.filter((item) => item !== "L")
              )
            }
          >
            <p
              className={
                sizes.includes("L")
                  ? `text-white bg-black transition active:scale-95 px-3 py-1 cursor-pointer`
                  : "bg-slate-200 px-3 py-1 cursor-pointer"
              }
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                !prev.includes("XL")
                  ? [...prev, "XL"]
                  : prev.filter((item) => item !== "XL")
              )
            }
          >
            <p
              className={
                sizes.includes("XL")
                  ? `text-white bg-black transition active:scale-95 px-3 py-1 cursor-pointer`
                  : "bg-slate-200 px-3 py-1 cursor-pointer"
              }
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                !prev.includes("XXL")
                  ? [...prev, "XXL"]
                  : prev.filter((item) => item !== "XXL")
              )
            }
          >
            <p
              className={
                sizes.includes("XXL")
                  ? `text-white bg-black transition active:scale-95 px-3 py-1 cursor-pointer`
                  : "bg-slate-200 px-3 py-1 cursor-pointer"
              }
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-gray-800 text-white transition hover:bg-black active:scale-95 rounded-md "
      >
        Add
      </button>
    </form>
  );
};

export default Add;
