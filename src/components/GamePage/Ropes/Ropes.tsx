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

//TODO: possibly change colors to be more mettalic lookin, and maybe change the look
// so its 2 ropes on the sides?

const Ropes: React.FC = () => {
  const problem = useSelector((state: GlobalState) => state.problem);
  const { srcIndex, destIndex } = useSelector((state: GlobalState) => state.animated);

  const spacer = getContainerSpacer();
  const width = getContainerWidth();
  const height = getContainerHeight();

  const srcLeft = (spacer / 2) * (srcIndex + 1) + (width + spacer / 2) * srcIndex;
  const srcBottom = (problem.data[srcIndex].length - 1) * height;

  //? These are the same for both scenarios
  const ls = srcLeft + width / 2 - 5; // Left start
  const bTop = 500; // Bottom top (default)
  const hTop = 0; // Height top (default)
  const bMid = 360 + height; // Bottom with container attached
  const hMid = 140 - height; // height with container attached
  const bSrcCont = srcBottom + height; // Bottom container
  const hSrcCont = bTop - srcBottom - height + hTop; // Height container

  // We are loading the truck
  const style = {
    bottom: bTop,
    left: hTop
  };

  let animate, transition;
  if (destIndex === -1) {
    const le = 488 + width / 2 - 5; // Left end

    const bTruck = hTop + 35 + height; // Bottom truck
    const hTruck = bTop - 35 - height; // Height truck

    animate = {
      bottom: [bTop, bSrcCont, bMid, bMid, bTruck, bTop, bTop],
      height: [hTop, hSrcCont, hMid, hMid, hTruck, hTop, hTop],
      left: [ls, ls, ls, le, le, le, le]
    };
    transition = getExtractTransition();
  } else {
    const bDestCont = (problem.data[destIndex].length + 1) * height;
    const le = (spacer / 2) * (destIndex + 1) + (width + spacer / 2) * destIndex + width / 2 - 5;

    animate = {
      bottom: [bTop, bSrcCont, bMid, bMid, bDestCont, bTop],
      height: [hTop, hSrcCont, hMid, hMid, bTop - bDestCont, hTop],
      left: [ls, ls, ls, le, le, le]
    };
    transition = getMoveTransition();
  }

  return <motion.div style={style} animate={animate} transition={transition} className="rope" />;
};

export default Ropes;
