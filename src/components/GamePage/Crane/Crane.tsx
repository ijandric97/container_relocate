import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../../redux/Store';

import BG from './images/Crane.png';

import './Crane.css';
import { breaks } from '../../../util/misc';

const Crane: React.FC = () => {
  const client = useSelector((state: GlobalState) => state.client);

  const settings = useSelector((state: GlobalState) => state.settings);

  // Calculate where to put them
  let left = client.width / 2 - 600 * (2 / 3) - 7; // DESKTOP
  if (client.width < breaks.sm) {
    left = client.width / 2 - 698 / 2; // MOBILE
  }

  const style: CSSProperties = {
    left: `${left}px`
  };

  return <img src={BG} draggable="false" alt="Crane" className="crane" style={style} />;
};

export default Crane;
