import { createContext, useEffect } from "react";
import { products } from "../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";

export const shopContext = createContext();

const ShopProvider = ({ children }) => {
  const currency = "$";
  const deliveryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (id, size, price) => {
    if (size === "") {
      toast.warning("please select a product size");
    } else {
      let cartData = structuredClone(cartItems);
      if (cartData[id]) {
        if (cartData[id]["sizes"][size]) {
          cartData[id]["sizes"][size] += 1;
          cartData[id]["price"] = price;
        } else {
          cartData[id]["sizes"][size] = 1;
          cartData[id]["price"] = price;
        }
      } else {
        cartData[id] = {};
        cartData[id]["sizes"] = {};
        cartData[id]["sizes"][size] = 1;
        cartData[id]["price"] = price;
      }
      setCartItems(cartData);
    }
  };

  const updateQuantity = async (id, size, quantity) => {
    let tempData = structuredClone(cartItems);
    tempData[id]["sizes"][size] = quantity;

    setCartItems(tempData);
  };

  const deleteProduct = async (id, size) => {
    let tempData = structuredClone(cartItems);
    delete tempData[id]["sizes"][size];

    setCartItems(tempData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const id in cartItems) {
      for (const size in cartItems[id]["sizes"]) {
        totalCount += cartItems[id]["sizes"][size];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    const productCopy = products.slice();
    let tempData = structuredClone(cartItems);
    let totalPrice = 0;

    for (const id in tempData) {
      for (const size in tempData[id]["sizes"]) {
        const price = tempData[id]["price"];
        const sizePrice = price * tempData[id]["sizes"][size];
        totalPrice += sizePrice;
      }
    }
    return totalPrice;
  };

  // useEffect(() => {
  //   // console.log(cartItems);
  //   console.log(getCartAmount());
  // }, [cartItems]);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    deleteProduct,
    getCartAmount,
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export default ShopProvider;
