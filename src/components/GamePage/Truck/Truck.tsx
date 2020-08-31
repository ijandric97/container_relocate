import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { breaks } from '../../../util/misc';
import { GlobalState } from '../../../redux/Store';
import { getExtractTransition, getContainerWidth } from '../Game';

import TruckImg from './images/Truck.png';
import TruckMobileImg from './images/Truck_Mobile.png';
import TruckContainerImg from './images/Truck_Container.png';

import './Truck.css';

const Truck: React.FC = () => {
  const client = useSelector((state: GlobalState) => state.client);

  if (client.width >= breaks.sm) return <TruckDesktop />;
  else return <TruckMobile />;
};

const TruckDesktop: React.FC = () => {
  const client = useSelector((state: GlobalState) => state.client);
  const { isActive, destIndex } = useSelector((state: GlobalState) => state.animated);

  const size = getContainerWidth() + 10;

  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${client.width / 2 + 250}px`,
    zIndex: 7
  };

  const animate = {
    bottom: [60, 60, 60, 60, 60, 60 - size / 2, 60],
    scale: [1, 1, 1, 1, 1, 0, 1]
  };

  return (
    <motion.img
      draggable="false"
      className="truck"
      style={style}
      animate={isActive && destIndex === -1 ? animate : undefined}
      transition={getExtractTransition()}
      src={TruckImg}
      alt="Truck"
    />
  );
};

export const TruckMobile: React.FC = () => {
  const client = useSelector((state: GlobalState) => state.client);
  const animated = useSelector((state: GlobalState) => state.animated);
  const containerOffset = 85; // How much left offset is the side container

  //? We are not animating an exit, dont render anything :)
  if (!(animated.isActive && animated.destIndex === -1)) return null;

  const getAnimate = (offset = 0) => {
    return {
      left: [
        `${client.width + offset}px`,
        `${client.width + offset}px`,
        `${client.width + offset}px`,
        `${client.width + offset}px`,
        `${client.width + offset}px`,
        `${client.width / 2 - 150 + offset}px`,
        `${-300 + offset}px`
      ]
    };
  };

  //? We want our truck to be linear
  const transition = {
    ...getExtractTransition(),
    ease: 'linear'
  };

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
