import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { GetUserID } from "../customHooks/userid";
import axios from "axios";

export const Navbar = () => {
  const location = useLocation();
  const UserID = GetUserID();
  const [pp, setPP] = useState("sssss");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const fetchPP = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/auth/user/${UserID}`
      );
      setPP(response.data.profilePicture);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!cookies.access_token) {
      setPP(
        "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Fprofile-icon-design-free-vector.jpg?alt=media&token=7bd14233-5344-4446-ae6f-4f717e594cfa"
      );
    } else {
      fetchPP();
    }
  }, [cookies.access_token]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("UserID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link
        to="/"
        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
      >
        <h2>Home</h2>
      </Link>
      <Link
        to="/people"
        className={`nav-link ${
          location.pathname === "/people" ? "active" : ""
        }`}
      >
        <h2> People</h2>
      </Link>
      {!cookies.access_token ? (
        <Link
          to="/auth"
          className={`nav-link ${
            location.pathname === "/auth" ? "active" : ""
          }`}
        >
          <h2>Sign In</h2>
        </Link>
      ) : (
        <button onClick={logout} id="logout">
          <h2>Logout</h2>
        </button>
      )}

      <Link
        to="/profile"
        className={`profile-link ${
          location.pathname === "/profile" ? "active" : ""
        }`}
      >
        <img
          id="profilepicinnav"
          src={
            pp ||
            "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Fprofile-icon-design-free-vector.jpg?alt=media&token=7bd14233-5344-4446-ae6f-4f717e594cfa"
          }
          alt="PP"
        />
      </Link>
    </div>
  );
};
