import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../../redux/Store';

import Trophy from './images/Trophy.png';

import './VictoryPopup.css';

const VictoryPopup: React.FC<any> = (props) => {
  const moveCount = useSelector((state: GlobalState) => state.history.length);
  const client = useSelector((state: GlobalState) => state.client);

  const popupStyle: CSSProperties = {
    left: `${client.width / 2 - 157}px`,
    top: `${client.height / 2 - 302}px`
  };

  console.log(client);
  console.log(popupStyle);

  return (
    <>
      <div className="popup" style={popupStyle}>
        <motion.img
          src={Trophy}
          alt="Trophy"
          className="trophy"
          style={{ filter: 'saturate(0)' }}
          animate={{ filter: 'saturate(5)' }}
          transition={{ duration: 1, yoyo: Infinity }}
        />
        <p>You finished the problem in {moveCount} moves!</p>
      </div>
    </>
  );
};

export default VictoryPopup;
