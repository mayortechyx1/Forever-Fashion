import { createContext } from "react";
import { products } from "../assets/assets";

export const shopContext = createContext();

const ShopProvider = ({ children }) => {
  const currency = "$";
  const deliveryFee = 10;

  const value = {
    products,
    currency,
    deliveryFee,
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export default ShopProvider;
