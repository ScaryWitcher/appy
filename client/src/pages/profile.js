import { AddProduct } from "../profileComponents/addProduct";
import { UserProducts } from "../profileComponents/userProducts";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { GetUserID } from "../customHooks/userid";
import { UpdateProfilePic } from "../profileComponents/updateProfilePic";
import { AddContactDetails } from "../profileComponents/addContactDetails";
import { UpdateContactDetails } from "../profileComponents/updateContact";
import AddArticle from "../profileComponents/AddArticle";

export const Profile = () => {
  const [visibleDiv, setVisibleDiv] = useState(null);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = GetUserID();

  const isVisibleDiv = (div) => {
    return visibleDiv === div;
  };

  return (
    <div className="profile-container">
      <div className="profile-operations">
        <button
          className="profile-button"
          onClick={() => setVisibleDiv("add")}
          disabled={!cookies.access_token}
        >
          Add Product
        </button>
        <button
          className="profile-button"
          onClick={() => setVisibleDiv("view")}
          disabled={!cookies.access_token}
        >
          View My Products
        </button>
        <button
          className="profile-button"
          onClick={() => setVisibleDiv("updateProfilePic")}
          disabled={!cookies.access_token}
        >
          Update Profile Picture
        </button>
        <button
          className="profile-button"
          onClick={() => setVisibleDiv("addContactDetails")}
          disabled={!cookies.access_token}
        >
          Add Contact Details
        </button>
        <button
          className="profile-button"
          onClick={() => setVisibleDiv("updateContactDetails")}
          disabled={!cookies.access_token}
        >
          Update Contact Details
        </button>
        <button
          className="profile-button"
          onClick={() => setVisibleDiv("addArticle")}
          disabled={!cookies.access_token}
        >
          Add Article
        </button>
      </div>
      {isVisibleDiv("add") && <AddProduct />}
      {isVisibleDiv("view") && <UserProducts userID={userID} />}
      {isVisibleDiv("updateProfilePic") && <UpdateProfilePic />}
      {isVisibleDiv("addContactDetails") && <AddContactDetails />}
      {isVisibleDiv("updateContactDetails") && <UpdateContactDetails />}
      {isVisibleDiv("addArticle") && <AddArticle />}
      {!cookies.access_token && (
        <h1 className="login-message">Log in to use Features</h1>
      )}
    </div>
  );
};
