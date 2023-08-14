import { useParams } from "react-router-dom";
import { UserProducts } from "./userProducts";
import { useState, useEffect } from "react";
import axios from "axios";

export const OtherUserProfile = () => {
  const { Userid } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/user/${Userid}`
        );
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [Userid]);

  return (
    <div id="otherUserProfileContainer">
      <div id="otherUserProfile">
        <img
          id="profilepicinprofilepage"
          src={
            user.profilePicture ||
            "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Fprofile-icon-design-free-vector.jpg?alt=media&token=7bd14233-5344-4446-ae6f-4f717e594cfa"
          }
        />
        <h3 id="otherUsername">{user.username}</h3>
      </div>
      <div className="contactDetails"></div>
      <UserProducts userID={Userid} />
    </div>
  );
};
