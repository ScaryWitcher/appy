import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const SearchBar = ({ location, name, placeHolder }) => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      if (searchTerm === "") {
        setResults([]);
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/${location}/search/?q=${searchTerm}`
      );
      name === "username"
        ? setResults(response.data.users)
        : setResults(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className="searchContainer">
      <div className="searchInput">
        <input
          id="searchInput1"
          type="text"
          value={searchTerm}
          placeholder={placeHolder}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          id="searchIcon"
          src="https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Fmagnifier.png?alt=media&token=5399ee75-cd11-45e4-82db-37577a3f8d57"
        ></img>
      </div>
      <div className="resultsContainer">
        <ul className="results">
          {results.map((item) => {
            if (name === "username") {
              return (
                <Link
                  to={`/people/${item._id}`}
                  className="searchBarToPerson"
                  key={item._id}
                >
                  <li>
                    <img
                      className="searchBarImage"
                      src={item.profilePicture}
                      alt={`Profile of ${item.username}`}
                    />
                    <h4 className="searchBarName">{item.username}</h4>
                  </li>
                </Link>
              );
            } else {
              return (
                <Link
                  to={`/product/${item._id}`}
                  className="searchBarToProduct"
                  key={item._id}
                >
                  <li>
                    <img
                      className="searchBarImage"
                      src={item.productImages[0]}
                      alt={`Product ${item.name}`}
                    />
                    <h4 className="searchBarName">{item.name}</h4>
                  </li>
                </Link>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};
