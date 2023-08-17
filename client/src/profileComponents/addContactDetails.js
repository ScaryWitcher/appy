import axios from "axios";
import { GetUserID } from "../customHooks/userid";
import { useState } from "react";

export const AddContactDetails = () => {
  const userID = GetUserID();

  const [contact, setContact] = useState({
    user: userID,
    faceBook: "",
    instagram: "",
    x: "",
    email: "",
    phNo: null,
  });

  const { faceBook, instagram, x, email, phNo } = contact;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/auth/addContactDetails`,
        contact
      );
      alert("Contact Details added successfully");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(
          "Contact Details are not updated. You need to go to the Update Contact Details menu to do this"
        );
      }
      console.log(err);
    }
  };

  return (
    <div className="ContactDetailsContainer">
      <form onSubmit={onSubmit}>
        <label className="contactLabel">Facebook:</label>
        <input
          type="text"
          name="faceBook"
          value={faceBook}
          onChange={handleChange}
          className="contactInput"
        />

        <label className="contactLabel">Instagram:</label>
        <input
          type="text"
          name="instagram"
          value={instagram}
          onChange={handleChange}
          className="contactInput"
        />

        <label className="contactLabel">X (Formerly Twitter):</label>
        <input
          type="text"
          name="x"
          value={x}
          onChange={handleChange}
          className="contactInput"
        />

        <label className="contactLabel">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="contactInput"
        />

        <label className="contactLabel">Phone Number:</label>
        <input
          type="tel"
          name="phNo"
          value={phNo || ""}
          onChange={handleChange}
          className="contactInput"
        />

        <button type="submit" className="submitButton">
          Add Contact Details
        </button>
      </form>
    </div>
  );
};
