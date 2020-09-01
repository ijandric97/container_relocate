import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

import Quokka from './images/RoyalQuokka.png';

import './ErrorPage.css';

const ErrorPage: React.FC<any> = () => {
  const [loaded, setLoaded] = useState(false);

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
      <h2>Not found</h2>
      <p>We couldn't find the page you were looking for :(</p>
      <p>
        Here is a happy <del>rainbow</del> ROYAL Quokka to cheer you up
      </p>
      <img src={Quokka} alt="Quokka" />
    </motion.div>
  );
};

export default ErrorPage;
