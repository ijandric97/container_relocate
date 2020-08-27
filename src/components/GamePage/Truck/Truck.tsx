import React, { CSSProperties } from 'react';
import { useGlobalState } from '../../../state/GlobalState';
import { motion, TargetAndTransition, Transition } from 'framer-motion';
import { breaks } from '../../../util/misc';
import { Client } from '../../../state/reducers/ClientReducer';

import './Truck.css';

import TruckImg from './images/Truck.png';
import TruckMobileImg from './images/Truck_Mobile.png';
import TruckContainerImg from './images/Truck_Container.png';
import { Problem } from '../../../state/reducers/ProblemReducer';

// ! MOBILE
// TODO: Truck height and width both hae to be set, set it to the same size its ok 120x120 for 3 conts
const TruckMobileWidth = 263;

const getTruckStyle = (client: Client) => {
  const style: CSSProperties = {
    position: 'absolute',
    bottom: '48px',
    left: `${client.width / 2}px`,
    zIndex: 90
  };

  return style;
};

const Truck: React.FC = () => {
  const {
    state: { client, problem, settings, animated }
  } = useGlobalState();

  const myProblem = problem as Problem;

  const TruckStyle: CSSProperties = {
    position: 'absolute',
    bottom: '48px',
    left: `${client.width / 2 + 170}px`,
    width: '50px',
    zIndex: 90
  };

  const truckAnimate: TargetAndTransition = {
    //x: `${-client.width - breaks.sm}px`
    //! WORKAROUND: x has a bug where it resets it to the initial position
    left: '-300px'
  };

  const transition = {
    duration: 7,
    ease: 'easeInOut',
    //times: [1, 1, 1, 1, 1, 1, 1],
    repeat: 1
  };

  const desktopStyle: CSSProperties = {
    width: `${settings.grid_width / myProblem.col_size + 10}px`,
    left: `${client.width / 2 + 170}px`
  };

  const desktopAnimate = {
    bottom: [60, 60, 60, 60, 60, 0, 60],
    scale: [1, 1, 1, 1, 1, 0, 1]
  };

  // Return depending on what we are doing
  if (client.width >= breaks.sm) {
    // DESKTOP
    console.log(client.width / 2);
    return (
      <motion.img
        draggable="false"
        className="truck"
        style={desktopStyle}
        animate={animated ? desktopAnimate : undefined}
        transition={transition}
        src={TruckImg}
        alt="Truck"
      />
    );
  }

  /* // Calculate where to put them
  let left = client.width / 2 - width * (2 / 3); // DESKTOP
  if (client.width < breaks.sm) {
    left = client.width / 2 - width / 2; // MOBILE
  } */
  // Animate the div that contains both the truck and our image
  return (
    <motion.div style={TruckStyle} animate={truckAnimate} transition={transition}>
      <img draggable="false" className="truck truck" src={TruckImg} alt="Truck" />
      <img draggable="false" className="truck container" src={TruckContainerImg} alt="Container" />
    </motion.div>
  );
};

export default Truck;
