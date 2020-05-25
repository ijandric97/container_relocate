import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGlobalState } from "../../state/GlobalState";

import Logo from "../../images/navbar_logo.png";
import "./Navbar.css";

enum breaks {
  xs = 0,
  sm = 2576,
  md = 768,
  lg = 992,
  xl = 1200
}

const Navbar: React.FC<any> = () => {
  const {
    state: { client }
  } = useGlobalState();

  const [isOpen, setIsOpen] = useState(false);

  const setNotOpen = () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  const renderHamburger = () => {
    return (
      <label className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ≡
      </label>
    );
  };

  const renderMenu = (isMobile: boolean) => {
    const isM = isMobile ? "mobile" : "";
    return (
      <>
        <Link to="/problems" className={`link ${isM}`} onClick={setNotOpen}>
          Problems
        </Link>
        <Link to="/statistics" className={`link ${isM}`} onClick={setNotOpen}>
          Statistics
        </Link>
        <Link to="/error" className={`link color ${isM}`} onClick={setNotOpen}>
          About
        </Link>
      </>
    );
  };

  const renderDesktopMenu = () => {
    return <div className="menu">{renderMenu(false)}</div>;
  };

  const renderMobileMenu = () => {
    return (
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="menu mobile"
      >
        <div className="border">{renderMenu(true)}</div>
      </motion.div>
    );
  };

  return (
    <motion.nav
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className="navbar"
      onClick={setNotOpen}
    >
      <Link to="/">
        <img src={Logo} className="logo" alt="logo" />
        <p className="title">Container Relocate</p>
      </Link>
      {client.width <= breaks.sm && renderHamburger()}
      {client.width >= breaks.sm && renderDesktopMenu()}
      {isOpen && renderMobileMenu()}
    </motion.nav>
  );
};

export default Navbar;
