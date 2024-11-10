import { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";

const RelatedProducts = ({ id, category, type }) => {
  const { products } = useContext(shopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getRelated = () => {
    if (products.length > 0) {
      let productsCopy = products.filter(
        (prod) => prod._id != id && prod.category === category
      );
      productsCopy = productsCopy.filter((prod) => prod.subCategory === type);

      productsCopy = productsCopy.slice(0, 5);

      setRelatedProducts(productsCopy);
    }
  };

  useEffect(() => {
    getRelated();
  }, [products, id]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((prod, index) => (
          <ProductItem
            key={index}
            id={prod._id}
            name={prod.name}
            image={prod.image}
            price={prod.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
