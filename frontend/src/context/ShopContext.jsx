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

  const addToCart = async (id, size) => {
    if (size === "") {
      toast.warning("please select a product size");
    } else {
      let cartData = structuredClone(cartItems);
      if (cartData[id]) {
        if (cartData[id][size]) {
          cartData[id][size] += 1;
        } else {
          cartData[id][size] = 1;
        }
      } else {
        cartData[id] = {};
        cartData[id][size] = 1;
      }
      setCartItems(cartData);
    }
  };

  const deleteProduct = (id, size) => {
    let tempData = structuredClone(cartItems);
    delete tempData[id][size];

    setCartItems(tempData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        totalCount += cartItems[id][size];
      }
    }
    return totalCount;
  };

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
    getCartCount,
    deleteProduct,
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export default ShopProvider;
