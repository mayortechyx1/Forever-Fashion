import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(shopContext);
  const [ProdData, setProdData] = useState(false);
  const [image, setImage] = useState("");
  const [sizebox, setSizebox] = useState("");

  const getProd = async () => {
    const prod = products.find((prod) => prod._id === productId);
    setProdData(prod);
    setImage(prod.image[0]);
  };

  useEffect(() => {
    getProd();
  }, [productId]);

  return ProdData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacitiy-100">
      {/* Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* --------Images part----------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {ProdData.image.map((pic, index) => (
              <img
                onClick={() => setImage(pic)}
                key={index}
                src={pic}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* -------------Information Part--------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{ProdData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_dull_icon} className="w-3.5" alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {ProdData.price}
          </p>
          <p className="pt-5 text-gray-500 md:w-4/5">{ProdData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {ProdData.sizes.map((size, index) => (
                <button
                  onClick={() => setSizebox(size)}
                  className={`border py-1 px-4 bg-gray-100 ${
                    size === sizebox ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-8 py-2 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-2 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Product;
