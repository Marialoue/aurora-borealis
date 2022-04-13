import React, { useState, useRef, useEffect } from "react";

const Header = () => {
  // useRef is used for accessing the real dom
  const headerRef = useRef();
  const [fixed, setfixed] = useState({ isfixed: false, margin: 0 });

  const handleScroll = (elementHeight, elementTopMargin) => {
    if (window.pageYOffset > elementHeight + elementTopMargin) {
      setfixed({ isfixed: true, margin: elementTopMargin });
    } else {
      setfixed({ isfixed: false, margin: 0 });
    }
  };

  useEffect(() => {
    var header = headerRef.current.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top, header.height);
    };

    // add event when scrolling
    window.addEventListener("scroll", handleScrollEvent);

    // and remove event when component will unmount
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  const style = {
    header: {
      position: "fixed",
      display: "flex",
      justifyContent: "center",
      top: "0px",
      width: "100%",
      fontSize: "1.5rem",
      transition: "0.2s",
      backgroundColor: "white"
    },
    fixed: {
      position: "fixed",
      display: "flex",
      justifyContent: "center",
      top: "0px",
      width: "100%",
      fontSize: "1rem",
      backgroundColor: "white",
      zIndex: "3"
    },
  };

  return (
    <header
      style={fixed.isfixed ? style.fixed : style.header}
      className={`header ${fixed.isfixed ? "fixed" : ""}`}
      ref={headerRef}
    >
      <h1 data-text="spacestagram">spacestagram</h1>
    </header>
  );
};

export default Header;
