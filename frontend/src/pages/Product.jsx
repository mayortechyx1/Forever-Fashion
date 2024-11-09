import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(shopContext);
  const [ProdData, setProdData] = useState(false);
  const [image, setImage] = useState("");

  const getProd = async () => {
    const prod = products.find((prod) => prod._id === productId);
    setProdData(prod);
    setImage(prod.image[0]);
  };

  useEffect(() => {
    getProd();
  }, [productId]);
  console.log(image);
  return <div>Product</div>;
};

export default Product;
