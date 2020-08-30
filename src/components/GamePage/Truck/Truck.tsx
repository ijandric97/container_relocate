import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { motion, TargetAndTransition, Transition } from 'framer-motion';
import { breaks } from '../../../util/misc';
import { ClientState } from '../../../redux/reducers/ClientReducer';
import { GlobalState } from '../../../redux/Store';
import { getExtractTransition } from '../Game';

import TruckImg from './images/Truck.png';
import TruckMobileImg from './images/Truck_Mobile.png';
import TruckContainerImg from './images/Truck_Container.png';

import './Truck.css';

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

  const desktopStyle: CSSProperties = {
    width: `${settings.grid_width / problem.col_size + 10}px`,
    left: `${client.width / 2 + 250}px`
  };

  const desktopAnimate = {
    bottom: [60, 60, 60, 60, 60, 0, 60],
    scale: [1, 1, 1, 1, 1, 0, 1]
  };

  /* // Return depending on what we are doing
  console.log('TRUCK_REDREAW');
  if (client.width >= breaks.sm) {
    // DESKTOP
    console.log('SHIT');
    return (
      <motion.img
        key={`${Date.now()}.${Math.random()}`}
        draggable="false"
        className="truck"
        style={desktopStyle}
        animate={animated.isActive ? desktopAnimate : undefined}
        transition={getExtractTransition()}
        src={TruckImg}
        alt="Truck"
      />
    );
  } */

  if (client.width >= breaks.sm) return <TruckDesktop />;
  else return <TruckMobile />;

  /* // Calculate where to put them
  let left = client.width / 2 - width * (2 / 3); // DESKTOP
  if (client.width < breaks.sm) {
    left = client.width / 2 - width / 2; // MOBILE
  } */
  // Animate the div that contains both the truck and our image
};

const TruckDesktop: React.FC = () => {
  return null;
};

// TODO: CHANGE THIS ALSO ADD TRUCK DESKTOP
export const TruckMobile: React.FC = () => {
  const client = useSelector((state: GlobalState) => state.client);
  const animated = useSelector((state: GlobalState) => state.animated);
  const containerOffset = 85;

  //? We are not animating an exit, dont render anything :)
  if (!(animated.isActive && animated.destIndex === -1)) return null;

  const getAnimate = (offset = 0) => {
    return {
      left: [`${client.width + offset}px`, `${-300 + offset}px`]
    };
  };

  const transition = {
    ...getExtractTransition(),
    ease: 'easeIn',
    times: [5 / 7, 1]
  };

  //TODO!: Somehow fix the truck not working on multiple rides
  // PERHAPS A DELAY?
  return (
    <>
      <motion.img
        draggable="false"
        className="truck"
        src={TruckMobileImg}
        alt="Truck"
        animate={getAnimate()}
        transition={transition}
      />
      <motion.img
        draggable="false"
        className="truck_container"
        src={TruckContainerImg}
        alt="Container"
        animate={getAnimate(containerOffset)}
        transition={transition}
      />
    </>
  );
};

export default Truck;
