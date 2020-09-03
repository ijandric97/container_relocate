import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../redux/Store';
import { strings } from '../../util/language';

import Quokka from './images/RoyalQuokka.png';

import './ErrorPage.css';

const ErrorPage: React.FC<any> = () => {
  const [loaded, setLoaded] = useState(false);
  const { language } = useSelector((state: GlobalState) => state.settings);

  const loadedVariants: Variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  const handleLoaded = () => {
    setLoaded(true);
  };

  return (
    <motion.div animate={loaded ? 'open' : 'closed'} variants={loadedVariants} onLoad={handleLoaded} className="error">
      <h1>404</h1>
      <h2>{strings[language].errorpage.title}</h2>
      <p>{strings[language].errorpage.main}</p>
      <p>
        {strings[language].errorpage.quokka[0]}
        <del>{strings[language].errorpage.quokka[1]}</del>
        {strings[language].errorpage.quokka[2]}
      </p>
      <img src={Quokka} alt="Quokka" />
    </motion.div>
  );
};

export default ErrorPage;
