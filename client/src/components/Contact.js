import React, { useState, useEffect } from "react";
import axios from "axios";

export const Contact = ({ userID }) => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/auth/getContactDetails/${userID}`
        );
        setContact(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchContactDetails();
  }, [userID]);

  const { faceBook, instagram, youtube, x, email, phNo } = contact
    ? contact
    : {};
  const TwitterLogo =
    "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Ftwitterlogo.png?alt=media&token=61e5f2e9-4751-4206-9fa3-77b7b8db5661";
  const FaceBookLogo =
    "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Ffacebook%20logo.png?alt=media&token=bdb7892b-3a23-45ba-ad74-82533044d8bc";
  const InstagramLogo =
    "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Finstagram%20logo.png?alt=media&token=42ee975b-8744-4f00-af36-f6692ff8a04a";
  const YoutubeLogo =
    "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Fyoutube%20Logo.png?alt=media&token=13bb15a9-00f7-4bf7-a5f7-4d852334262e";
  const EmailIcon =
    "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Femail%20icon.png?alt=media&token=f5a64488-6a2a-45c1-ae9b-2323bb227155";
  const PhoneIcon =
    "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Fphone%20icon.png?alt=media&token=f5246206-8a09-477d-af0b-08e260291d40";

  const handleImageClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  const handleEmailClick = () => {
    if (email) {
      const dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = email;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      alert("Email copied to clipboard!");
    }
  };

  const handlePhoneClick = () => {
    if (phNo) {
      const dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = phNo.toString();
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      alert("Phone number copied to clipboard!");
    }
  };

  return (
    <div>
      <div className="social-icons-container">
        {faceBook && (
          <img
            src={FaceBookLogo}
            alt="Facebook Icon"
            className="social-icon"
            onClick={() => handleImageClick(faceBook)}
          />
        )}
        {instagram && (
          <img
            src={InstagramLogo}
            alt="Instagram Icon"
            className="social-icon"
            onClick={() => handleImageClick(instagram)}
          />
        )}
        {youtube && (
          <img
            src={YoutubeLogo}
            alt="YouTube Icon"
            className="social-icon"
            onClick={() => handleImageClick(youtube)}
          />
        )}
        {x && (
          <img
            src={TwitterLogo}
            alt="X (Formerly Twitter) Icon"
            className="social-icon"
            onClick={() => handleImageClick(x)}
          />
        )}
        {email && (
          <img
            src={EmailIcon}
            alt="Email Icon"
            className="social-icon"
            onClick={handleEmailClick}
          />
        )}
        {phNo && (
          <img
            src={PhoneIcon}
            alt="Phone Icon"
            className="social-icon"
            onClick={handlePhoneClick}
          />
        )}
      </div>
    </div>
  );
};
