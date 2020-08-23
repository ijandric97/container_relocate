import React, { CSSProperties } from 'react';
import { useGlobalState } from '../../../state/GlobalState';
import { motion, TargetAndTransition, Transition, Variant, useCycle } from 'framer-motion';
import { breaks } from '../../../util/misc.ts';

import './Truck.css';

import TruckImg from './images/truck_mobile.png';
import TruckContainer from './images/truck_container.png';

// ! MOBILE
const TruckMobileWidth = 263;

const Truck: React.FC<void> = () => {
  const {
    state: { client }
  } = useGlobalState();

  const TruckStyle: CSSProperties = {
    position: 'absolute',
    bottom: '48px',
    left: `${client.width + 100}px`,
    zIndex: 90
  };

  const truckAnimate: TargetAndTransition = {
    //x: `${-client.width - breaks.sm}px`
    // WORKAROUND: x has a bug where it resets it to the initial position
    // this does not work for us since we can resize the game window
    // and it wont take that into account
    left: '-300px'
  };

  const truckTransition: Transition = {
    loop: Infinity,
    ease: 'linear',
    duration: 3,
    delay: 0
  };

  // Animate the div that contains both the truck and our image
  return (
    <motion.div style={TruckStyle} animate={truckAnimate} transition={truckTransition}>
      <img draggable="false" className="truck truck" src={TruckImg} alt="Truck" />
      <img draggable="false" className="truck container" src={TruckContainer} alt="Container" />
    </motion.div>
  );
};

export default Truck;
