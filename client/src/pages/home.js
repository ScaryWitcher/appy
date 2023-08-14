import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

export const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="homeContainer">
      <h2 className="cartoonyTitle">Products</h2>
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
