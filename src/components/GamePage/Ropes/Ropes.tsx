import React from 'react';
import { useSelector } from 'react-redux';

import './Ropes.css';
import { motion } from 'framer-motion';
import { GlobalState } from '../../../redux/Store';
import {
  getExtractTransition,
  getContainerWidth,
  getContainerSpacer,
  getContainerHeight,
  getMoveTransition
} from '../Game';

const Ropes: React.FC = () => {
  const problem = useSelector((state: GlobalState) => state.problem);
  const { srcIndex, destIndex } = useSelector((state: GlobalState) => state.animated);

  const spacer = getContainerSpacer();
  const width = getContainerWidth();
  const height = getContainerHeight();

  const ropeWidth = 8;

  const srcLeft = (spacer / 2) * (srcIndex + 1) + (width + spacer / 2) * srcIndex;
  const srcBottom = (problem.data[srcIndex].length - 1) * height;

  //? These are the same for both scenarios
  const ls = srcLeft + width / 2 - ropeWidth / 2; // Left start
  const bTop = 500; // Bottom top (default)
  const hTop = 0; // Height top (default)
  const bMid = 360 + height; // Bottom with container attached
  const hMid = 140 - height; // height with container attached
  const bSrcCont = srcBottom + height; // Bottom container
  const hSrcCont = bTop - srcBottom - height + hTop; // Height container

  //Defaults :)
  const style = {
    bottom: bTop,
    left: hTop
  };

  const getAnimate = (offset: number = 0) => {
    if (destIndex === -1) {
      const le = 488 + width / 2 - ropeWidth / 2 + offset; // Left end
      const newLs = ls + offset;

      const bTruck = hTop + 35 + height; // Bottom truck
      const hTruck = bTop - 35 - height; // Height truck

      return {
        bottom: [bTop, bSrcCont, bMid, bMid, bTruck, bTop, bTop],
        height: [hTop, hSrcCont, hMid, hMid, hTruck, hTop, hTop],
        left: [newLs, newLs, newLs, le, le, le, le]
      };
    } else {
      const bDestCont = (problem.data[destIndex].length + 1) * height;
      const le = (spacer / 2) * (destIndex + 1) + (width + spacer / 2) * destIndex + width / 2 - ropeWidth / 2 + offset;
      const newLs = ls + offset;

      return {
        bottom: [bTop, bSrcCont, bMid, bMid, bDestCont, bTop, bTop],
        height: [hTop, hSrcCont, hMid, hMid, bTop - bDestCont, hTop, hTop],
        left: [newLs, newLs, newLs, le, le, le, le]
      };
    }
  };

  const getTransition = () => {
    if (destIndex === -1) return getExtractTransition();
    return getMoveTransition();
  };

  return (
    <>
      <motion.div
        style={style}
        animate={getAnimate(-width / 2 + spacer)}
        transition={getTransition()}
        className="rope"
      />
      <motion.div
        style={style}
        animate={getAnimate(width / 2 - spacer)}
        transition={getTransition()}
        className="rope"
      />
    </>
  );
};

export default Ropes;
