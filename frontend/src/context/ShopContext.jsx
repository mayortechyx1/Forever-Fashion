import { createContext } from "react";
import { products } from "../assets/assets";


const shopContext = createContext();

const shopProvider = ({children}) => {
  const currency = '$'
  const deliveryFee = 10

  const value = {
    products, currency, deliveryFee
  }

  return (
    <shopContext.Provider value={value} >
      {children}
    </shopContext.Provider>
  );

}

export default shopProvider