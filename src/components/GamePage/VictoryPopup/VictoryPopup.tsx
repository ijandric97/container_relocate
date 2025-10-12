import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../../redux/Store';
import { strings } from '../../../util/language';

import Trophy from './images/Trophy.png';

import './VictoryPopup.css';

const VictoryPopup: React.FC = () => {
  const moveCount = useSelector((state: GlobalState) => state.history.length);
  const client = useSelector((state: GlobalState) => state.client);
  const { language } = useSelector((state: GlobalState) => state.settings);

  const popupStyle: CSSProperties = {
    left: `${client.width / 2 - 157}px`,
    top: `${client.height / 2 - 302}px`
  };

  const animate = {
    filter: ['saturate(5)', 'saturate(0)', 'saturate(5)'],
    rotate: [-5, 0, 5],
    scale: [1.2, 1, 1.2],
    x: [5, 5, 5],
    y: [-25, -25, -25]
  };

  return (
    <>
      <div className="popup" style={popupStyle}>
        <motion.img
          draggable="false"
          src={Trophy}
          alt="Trophy"
          className="trophy"
          animate={animate}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        <p>
          {strings[language].gamepage.victory[0]}
          <b>{moveCount}</b>
          {strings[language].gamepage.victory[1]}
        </p>
      </div>
    </>
  );
};

export default VictoryPopup;
