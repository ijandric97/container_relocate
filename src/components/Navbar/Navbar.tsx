import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, Variants } from "framer-motion";
import Logo from "../../images/navbar_logo.png";
import "./Navbar.css";
import { useGlobalState } from "../../state/GlobalState";

const Navbar: React.FC<any> = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLInputElement>(null);
  const hamRef = useRef<HTMLLabelElement>(null);

  //const [{ client }, dispatch] = useGlobalState();

  const menuAnimation = useAnimation();
  const menuVariants: Variants = {
    visible: {
      opacity: [0, 1],
      transition: {
        duration: 1
      }
    },
    hidden: {
      opacity: 0
    }
  };

  useEffect(() => {
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

        if (toggleRef.current.checked === true) {
          menuAnimation.start("visible");
        } else {
          //menuAnimation.start("hidden");
        }
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      // Cleanup once the component is unmounted :)
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuAnimation]);

  return (
    <motion.nav
      animate={{ opacity: 1 }}
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
      <motion.div
        animate={menuAnimation}
        variants={menuVariants}
        ref={menuRef}
        className="navbar__menu"
      >
        <div className="navbar__border">
          <Link to="/problems" className="navbar__link">
            Problems
          </Link>
          <Link to="/statistics" className="navbar__link">
            Statistics
          </Link>
          <Link to="/error" className="navbar__link navbar__link--color">
            About
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
