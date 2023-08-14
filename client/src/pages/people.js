import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

export const People = () => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/auth/people`
        );
        setPeople(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPeople();
  }, []);

  return (
    <div className="peopleAndSearchContainer">
      <ul className="peopleCards">
        {people.map((person) => (
          <Link to={`/people/${person._id}`} className="personLink">
            <li key={person._id} className="personCard">
              <img
                id="profilepicinpersoncard"
                src={
                  person.profilePicture ||
                  "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Fprofile-icon-design-free-vector.jpg?alt=media&token=7bd14233-5344-4446-ae6f-4f717e594cfa"
                }
              />
              <h2 className="personUsername">{person.username}</h2>
            </li>
          </Link>
        ))}
      </ul>
      <div className="searchBarContainer">
        <SearchBar
          location={"auth"}
          name={"username"}
          placeHolder={"Search Users..."}
        />
      </div>
    </div>
  );
};
