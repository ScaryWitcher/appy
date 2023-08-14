import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetUserID } from "../customHooks/userid";
import { useCookies } from "react-cookie";

export const UserProducts = ({ userID }) => {
  const [products, setProducts] = useState([]);
  const loggedUser = GetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/userProducts/${userID}`
        );
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [userID]);

  return (
    <div className="userProductsContainer">
      <h2 className="cartoonyTitle">Products</h2>
      <ul className="productCards">
        {products.map((product) => (
          <li className="productCard" key={product._id}>
            <Link to={`/product/${product._id}`} className="productPageLink">
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
            </Link>
            {cookies.access_token && loggedUser === userID && (
              <Link
                to={`/product/updateDetails/${product._id}`}
                id="productUpdatePageLink"
              >
                Update..
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
