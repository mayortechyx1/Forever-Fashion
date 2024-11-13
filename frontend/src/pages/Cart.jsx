import { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    deleteProduct,
    updateQuantity,
    getCartCount,
  } = useContext(shopContext);
  const [cartArray, setCartArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cartData = [];
    for (const id in cartItems) {
      for (const size in cartItems[id]["sizes"]) {
        cartData.push({
          _id: id,
          size,
          price: cartItems[id]["price"],
          quantity: cartItems[id]["sizes"][size],
        });
      }
    }
    setCartArray(cartData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {getCartCount() !== 0 ? (
          cartArray.map((item, index) => {
            const product = products.find((prod) => prod._id === item._id);
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="w-16 sm:w-20 cursor-pointer"
                    src={product.image[0]}
                    alt=""
                  />
                  <div>
                    <p
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="text-xs sm:text-lg font-medium cursor-pointer"
                    >
                      {product.name}
                    </p>
                    <div className="flex tems-center gap-5 mt-2">
                      <p>
                        {currency}
                        {item.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    updateQuantity(
                      item._id,
                      item.size,
                      e.target.value === "0" || e.target.value === ""
                        ? 1
                        : Number(e.target.value)
                    )
                  }
                  min={1}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => deleteProduct(item._id, item.size)}
                  src={assets.bin_icon}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  alt=""
                />
              </div>
            );
          })
        ) : (
          <div className="font-bold text-2xl text-center">
            YOUR CART IS EMPTY
          </div>
        )}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() =>
                getCartCount() === 0
                  ? toast.error("your cart is empty")
                  : navigate("/place-order")
              }
              className="bg-black text-white text-sm my-8 px-8 py-3 hover:opacity-[0.7]"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
