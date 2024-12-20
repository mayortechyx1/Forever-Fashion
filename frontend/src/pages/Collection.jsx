import { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(shopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [sortValue, setSortValue] = useState("Relevant");

  const selectCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((val) => val !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const selectType = (e) => {
    if (type.includes(e.target.value)) {
      setType((prev) => prev.filter((val) => val !== e.target.value));
    } else {
      setType((prev) => [...prev, e.target.value]);
    }
  };

  let productsCopy = products.slice(); //to create a copy of products

  const applyFilter = () => {
    if (search) {
      productsCopy = productsCopy.filter((prod) =>
        prod.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((prod) =>
        category.includes(prod.category)
      );
    }
    if (type.length > 0) {
      productsCopy = productsCopy.filter((prod) =>
        type.includes(prod.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    switch (sortValue) {
      case "low-high":
        setFilterProducts(productsCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(productsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
    sortProduct();
  }, [category, type, sortValue, search]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter part */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS{" "}
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* category box */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={selectCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={selectCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={selectCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* Type box */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={selectType}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={selectType}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={selectType}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Products part */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortValue(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* collection listings */}
        {filterProducts[0] ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <div className="border-t pt-16">
            <div className="text-2xl text-center">
              <Title text1={"NO"} text2={"PRODUCT FOUND"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
