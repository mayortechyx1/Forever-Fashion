import { createContext } from "react";
import { products } from "../assets/assets";
import { useState } from "react";

export const shopContext = createContext();

const ShopProvider = ({ children }) => {
  const currency = "$";
  const deliveryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export default ShopProvider;
