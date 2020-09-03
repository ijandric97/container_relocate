import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { breaks } from '../../util/misc';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../redux/Store';

import Logo from './images/Logo.png';

import './Navbar.css';
import { strings } from '../../util/language';

const Navbar: React.FC<any> = () => {
  const client = useSelector((state: GlobalState) => state.client);
  const { language } = useSelector((state: GlobalState) => state.settings);

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
    const isM = isMobile ? 'mobile' : '';
    return (
      <>
        <Link to="/problems" className={`link ${isM}`} onClick={setNotOpen}>
          {strings[language].navbar.problems}
        </Link>
        <Link to="/settings" className={`link ${isM}`} onClick={setNotOpen}>
          {strings[language].navbar.settings}
        </Link>
        <Link to="/game" className={`link color ${isM}`} onClick={setNotOpen}>
          {strings[language].navbar.game}
        </Link>
      </>
    );
  };

  const renderDesktopMenu = () => {
    return <div className="menu">{renderMenu(false)}</div>;
  };

  const renderMobileMenu = () => {
    return (
      <motion.div animate={{ opacity: 1 }} transition={{ duration: 1 }} className="menu mobile">
        <div className="border">{renderMenu(true)}</div>
      </motion.div>
    );
  };

  return (
    <motion.nav animate={{ opacity: [0, 1] }} transition={{ duration: 1 }} className="navbar" onClick={setNotOpen}>
      <Link to="/">
        <img src={Logo} draggable="false" className="logo" alt="Logo" />
        <p className="title">Container Relocate</p>
      </Link>
      {client.width < breaks.sm && renderHamburger()}
      {client.width >= breaks.sm && renderDesktopMenu()}
      {isOpen && renderMobileMenu()}
    </motion.nav>
  );
};

export default Navbar;
