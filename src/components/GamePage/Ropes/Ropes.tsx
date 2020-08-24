import React, { useEffect } from 'react';
import { useGlobalState } from '../../../state/GlobalState';

import './Ropes.css';
import { motion } from 'framer-motion';

type RopeProps = {
  width: number;
  height: number;
  left: number;
  bottom: number;
};

const Ropes: React.FC<RopeProps> = ({ width, height, left, bottom }) => {
  const {
    state: { problem, problems },
    dispatch // TODO: probably client also and shit
  } = useGlobalState();

  // Effect?
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  // Again make global somehow? perhaps not?
  const ls = left + width / 2; // Left start
  const le = 400 + width / 2; // left end
  const bTop = 610; // Bottom top (default)
  const hTop = 10; // Height top (default)
  const bCont = bottom + height; // Bottom container
  const hCont = bTop - bottom - height + hTop; // Height container
  // Add truck height too idiot
  const bTruck = 0 + height; // Bottom truck
  const hTruck = bTop - height + hTop; // Height truck

  // TODO: Calculate this
  const animate = {
    bottom: [bTop, bCont, bTop, bTop, bTruck, bTop, bTop],
    height: [hTop, hCont, hTop, hTop, hTruck, hTop, hTop],
    left: [ls, ls, ls, le, le, le, le]
  };

  // TODO: Make this global or in utils or somwhContre, game logic i guess :)
  const transition = {
    duration: 7,
    ease: 'easeInOut',
    //times: [1, 1, 1, 1, 1, 1, 1],
    repeat: 1
  };

  return <motion.div animate={animate} transition={transition} className="rope"></motion.div>;
};

export default Ropes;
