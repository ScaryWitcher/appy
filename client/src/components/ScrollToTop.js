import React, { useState } from "react";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <button
      className={`scrollToTopButton ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <img
        id="scrollButtonImage"
        src={
          "https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Farrow.png?alt=media&token=6ea91c3d-a7d4-4348-906a-27bbfa7c22e7"
        }
        alt="Scroll to Top"
      />
    </button>
  );
};

export default ScrollToTopButton;
