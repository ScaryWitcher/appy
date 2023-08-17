import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { BarLoader } from "react-spinners";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/products`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="homeContainer">
      <h2 className="cartoonyTitle">Products</h2>
      {loading ? (
        <div className="loading-container">
          <BarLoader color={"#36D7B7"} loading={true} />
        </div>
      ) : (
        <ul className="productCards">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="productPageLink"
            >
              <li key={product._id} className="productCard">
                <img
                  src={product.productImages[0]}
                  className="productImage"
                  alt={product.name}
                />
                <div>
                  <h2 className="cartoonyHeading">{product.name}</h2>
                </div>
                <div>
                  <h3 className="cartoonyPrice">Rs.{product.price}</h3>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
      <div className="searchBarContainer">
        <SearchBar
          location={"products"}
          name={"name"}
          placeHolder={"Search Products..."}
        />
      </div>
    </div>
  );
};
