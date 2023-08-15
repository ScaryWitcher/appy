import { AddProduct } from "../profileComponents/addProduct";
import { UserProducts } from "../profileComponents/userProducts";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { GetUserID } from "../customHooks/userid";
import { UpdateProfilePic } from "../profileComponents/updateProfilePic";
import { AddContactDetails } from "../profileComponents/addContactDetails";

export const Profile = () => {
  const [visibleDiv, setVisibleDiv] = useState(null);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = GetUserID();

  const isVisibleDiv = (div) => {
    return visibleDiv === div;
  };

  return (
    <div>
      {cookies.access_token ? (
        <div className="productOperations">
          <button onClick={() => setVisibleDiv("add")}>AddProduct</button>
          <button onClick={() => setVisibleDiv("view")}>ViewMyProducts</button>
          <button onClick={() => setVisibleDiv("updateProfilePic")}>
            Update Profile Picture
          </button>
          <button onClick={() => setVisibleDiv("addContactDetails")}>
            Add Contact Details
          </button>
          {isVisibleDiv("add") && <AddProduct />}
          {isVisibleDiv("view") && <UserProducts userID={userID} />}
          {isVisibleDiv("updateProfilePic") && <UpdateProfilePic />}
          {isVisibleDiv("addContactDetails") && <AddContactDetails />}
        </div>
      ) : (
        <h1>You have to log In first</h1>
      )}
    </div>
  );
};
