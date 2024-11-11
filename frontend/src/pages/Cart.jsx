import { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, deleteProduct, getCartCount } =
    useContext(shopContext);
  const [cartArray, setCartArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cartData = [];
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        cartData.push({
          _id: id,
          size,
          quantity: cartItems[id][size],
        });
      }
    }
    setCartArray(cartData);
  }, [cartItems]);

  return getCartCount() !== 0 ? (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartArray.map((item, index) => {
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
                      {product.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="text"
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
        })}
      </div>
    </div>
  ) : (
    <div className="font-bold text-3xl text-center">YOUR CART IS EMPTY</div>
  );
};

export default Cart;
