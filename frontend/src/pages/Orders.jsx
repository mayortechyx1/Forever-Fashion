import { useContext } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Orders = () => {
  const { products, cartPageArray, currency, myOrders } =
    useContext(shopContext);

  return myOrders.length > 0 ? (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {cartPageArray.map((item, index) => {
          const product = products.find((prod) => prod._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={product.image[0]} alt="" />
                <div>
                  <p className="sm:text-base font-medium">{product.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {product.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date: <span className="text-gray-400">25 Jul 2024</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2 ">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">Ready to ship</p>
                </div>
                <button className="transition transform hover:scale-105 border px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-200 active:bg-gray-400">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="border-t pt-16">
      <div className="text-2xl text-center">
        <Title text1={"NO"} text2={"ORDERS"} />
      </div>
    </div>
  );
};

export default Orders;
