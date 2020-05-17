import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../images/navbar_logo.png";
import "./Navbar.css";

const Navbar: React.FC<any> = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLInputElement>(null);
  const hamRef = useRef<HTMLLabelElement>(null);

  const handleClick = (e: any) => {
    if (null !== toggleRef.current) {
      if (null !== hamRef.current && hamRef.current.contains(e.target)) {
        // We clicked on the hamburger icon, open the menu if it's
        // closed, or close the menu if it's open (TOGGLE THE MENU)
        toggleRef.current.checked = !toggleRef.current.checked;
      } else if (
        null !== menuRef.current &&
        menuRef.current.contains(e.target)
      ) {
        // We clicked on the menu item, pass the click event
        // to the target element then close the menu
        e.target.click();
        toggleRef.current.checked = false;
      } else {
        // We clicked outside of the menu, CLOSE IT!
        toggleRef.current.checked = false;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      // Cleanup once the component is unmounted :)
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <motion.nav
      animate={{ y: [-60, 0], opacity: 1 }}
      transition={{ duration: 1 }}
      className="navbar"
    >
      <Link to="/">
        <img src={Logo} className="navbar__logo" alt="logo" />
        <p className="navbar__title">Container Relocate</p>
      </Link>
      <label ref={hamRef} className="navbar__hamburger">
        ≡
      </label>
      <input ref={toggleRef} type="checkbox" id="navbarToggle" />
      <div ref={menuRef} className="navbar__menu">
        <motion.div className="navbar__border">
          <Link to="/problems" className="navbar__link">
            Problems
          </Link>
          <Link to="/statistics" className="navbar__link">
            Statistics
          </Link>
          <Link to="/error" className="navbar__link navbar__link--green">
            About
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
