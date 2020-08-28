import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../../redux/Store';

import Trophy from './images/Trophy.png';

import './VictoryPopup.css';

const VictoryPopup: React.FC = () => {
  const moveCount = useSelector((state: GlobalState) => state.history.length);
  const client = useSelector((state: GlobalState) => state.client);

  const popupStyle: CSSProperties = {
    left: `${client.width / 2 - 157}px`,
    top: `${client.height / 2 - 302}px`
  };

  const animate = {
    filter: ['saturate(5)', 'saturate(0)', 'saturate(5)'],
    rotate: [-5, 0, 5],
    scale: [1.2, 1, 1.2],
    y: [-25, -25, -25]
  };

  const transition = {
    duration: 1,
    yoyo: Infinity
  };

  return (
    <>
      <div className="popup" style={popupStyle}>
        <motion.img src={Trophy} alt="Trophy" className="trophy" animate={animate} transition={transition} />
        <p>You finished the problem in {moveCount} moves!</p>
      </div>
    </>
  );
};

export default VictoryPopup;
