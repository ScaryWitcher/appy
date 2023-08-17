import React, { useState } from "react";
import axios from "axios";
import { GetUserID } from "../customHooks/userid";
export const UpdateContactDetails = () => {
  const userID = GetUserID();
  const [faceBook, setFaceBook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [x, setX] = useState("");
  const [phNo, setPhNo] = useState(0);
  const [email, setEmail] = useState("");

  const updateFaceBook = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/auth/updateFaceBook/${userID}`,
        {
          faceBook: faceBook,
        }
      );
      alert("Info updated");
    } catch (err) {
      console.log(err);
    }
  };

  const updateInstagram = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/auth/updateInstagram/${userID}`,
        {
          instagram: instagram,
        }
      );
      alert("Info updated");
    } catch (err) {
      console.log(err);
    }
  };

  const updateYoutube = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/auth/updateYoutube/${userID}`,
        {
          youtube: youtube,
        }
      );
      alert("Info updated");
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmail = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/auth/updateEmail/${userID}`,
        {
          email: email,
        }
      );
      alert("Info updated");
    } catch (err) {
      console.log(err);
    }
  };
  const updatePhoneNumber = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/auth/updatePhoneNumber/${userID}`,
        {
          phNo: phNo,
        }
      );
      alert("Info updated");
    } catch (err) {
      console.log(err);
    }
  };
  const updateX = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/auth/updateX/${userID}`,
        {
          x: x,
        }
      );
      alert("Info updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="updateContactContainer">
      <h1 id="updateContactDetailsHeading">Update Contact Details</h1>

      <div className="contactDetailsBlock">
        <label htmlFor="faceBookInput" className="contactLabel">
          Facebook:
        </label>
        <input
          id="faceBookInput"
          value={faceBook}
          onChange={(e) => setFaceBook(e.target.value)}
          className="inputField"
        />
        <button
          id="faceBookUpdateButton"
          onClick={updateFaceBook}
          className="updateButton"
        >
          Update
        </button>
      </div>

      <div className="contactDetailsBlock">
        <label htmlFor="instagramInput" className="contactLabel">
          Instagram:
        </label>
        <input
          id="instagramInput"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="inputField"
        />
        <button
          id="instagramUpdateButton"
          onClick={updateInstagram}
          className="updateButton"
        >
          Update
        </button>
      </div>

      <div className="contactDetailsBlock">
        <label htmlFor="youtubeInput" className="contactLabel">
          YouTube:
        </label>
        <input
          id="youtubeInput"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          className="inputField"
        />
        <button
          id="youtubeUpdateButton"
          onClick={updateYoutube}
          className="updateButton"
        >
          Update
        </button>
      </div>

      <div className="contactDetailsBlock">
        <label htmlFor="xInput" className="contactLabel">
          X (Formerly Twitter):
        </label>
        <input
          id="xInput"
          value={x}
          onChange={(e) => setX(e.target.value)}
          className="inputField"
        />
        <button id="xUpdateButton" onClick={updateX} className="updateButton">
          Update
        </button>
      </div>

      <div className="contactDetailsBlock">
        <label htmlFor="phNoInput" className="contactLabel">
          Phone Number:
        </label>
        <input
          id="phNoInput"
          value={phNo}
          onChange={(e) => setPhNo(e.target.value)}
          className="inputField"
        />
        <button
          id="phNoUpdateButton"
          onClick={updatePhoneNumber}
          className="updateButton"
        >
          Update
        </button>
      </div>

      <div className="contactDetailsBlock">
        <label htmlFor="emailInput" className="contactLabel">
          Email:
        </label>
        <input
          id="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputField"
        />
        <button
          id="emailUpdateButton"
          onClick={updateEmail}
          className="updateButton"
        >
          Update
        </button>
      </div>
    </div>
  );
};
