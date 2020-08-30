import React, { CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, TargetAndTransition, Transition } from 'framer-motion';
import { breaks } from '../../../util/misc';

import './Truck.css';

import TruckImg from './images/Truck.png';
import TruckMobileImg from './images/Truck_Mobile.png';
import TruckContainerImg from './images/Truck_Container.png';
import { ClientState } from '../../../redux/reducers/ClientReducer';
import { ProblemState } from '../../../redux/reducers/ProblemReducer';
import { SettingsState } from '../../../redux/reducers/SettingsReducer';
import { AnimatedState } from '../../../redux/reducers/AnimatedReducer';
import { GlobalState } from '../../../redux/Store';

// ! MOBILE
// TODO: Truck height and width both hae to be set, set it to the same size its ok 120x120 for 3 conts
const TruckMobileWidth = 263;

const getTruckStyle = (client: ClientState) => {
  const style: CSSProperties = {
    position: 'absolute',
    bottom: '48px',
    left: `${client.width / 2}px`,
    zIndex: 90
  };

  return style;
};

const Truck: React.FC = () => {
  const client = useSelector((state: GlobalState) => state.client);
  const problem = useSelector((state: GlobalState) => state.problem);
  const settings = useSelector((state: GlobalState) => state.settings);
  const animated = useSelector((state: GlobalState) => state.animated);

  const myProblem = problem as ProblemState;

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
    duration: 7 * settings.animation_duration,
    ease: 'easeInOut',
    //times: [1, 1, 1, 1, 1, 1, 1],
    repeat: Infinity
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
  console.log('TRUCK_REDREAW');
  if (client.width >= breaks.sm) {
    // DESKTOP
    console.log(client.width / 2);
    return (
      <motion.img
        key={`${Date.now()}.${Math.random()}`}
        draggable="false"
        className="truck"
        style={desktopStyle}
        animate={animated.isActive ? desktopAnimate : undefined}
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
