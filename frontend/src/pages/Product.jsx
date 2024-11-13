import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import Title from "../components/Title";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(shopContext);
  const [prodData, setProdData] = useState(false);
  const [image, setImage] = useState("");
  const [sizebox, setSizebox] = useState("");
  const prod = products.find((prod) => prod._id === productId);

  const getProd = async () => {
    setProdData(prod);
    setImage(prod.image[0]);
  };

  useEffect(() => {
    getProd();
  }, [productId]);

  return prodData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacitiy-100">
      {/* Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* --------Images part----------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {prodData.image.map((pic, index) => (
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
          <h1 className="font-medium text-2xl mt-2">{prodData.name}</h1>
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
            {prodData.price}
          </p>
          <p className="pt-5 text-gray-500 md:w-4/5">{prodData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {prodData.sizes.map((size, index) => (
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
          <button
            onClick={() => addToCart(prodData._id, sizebox, prodData.price)}
            className="bg-black text-white px-8 py-2 text-sm active:bg-gray-700"
          >
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

      {/* ---------Description and Review-------------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, and any available variations
            (e.g sizes, colors). Each product usually has its own dedicated page
            with relevant information.
          </p>
        </div>
      </div>

      {/*----------- Related Products ------------ */}
      <RelatedProducts
        id={prodData._id}
        category={prodData.category}
        type={prodData.subCategory}
      />
    </div>
  ) : (
    <div className="border-t pt-16">
      <div className="text-2xl text-center">
        <Title text1={"PRODUCT"} text2={"NOT AVAILABLE"} />
      </div>
    </div>
  );
};

export default Product;
