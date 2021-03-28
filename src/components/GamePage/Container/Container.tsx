import React, { CSSProperties } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ProblemState, ProblemTypes } from '../../../redux/reducers/ProblemReducer';
import { GlobalState } from '../../../redux/Store';
import {
  getExtractTransition,
  endContainerAnimation,
  getContainerWidth,
  getContainerHeight,
  getContainerSpacer,
  getMoveTransition,
  startContainerAnimation
} from '../Game';

import Ropes from '../Ropes/Ropes';

import BGGreen from './images/Container_Green.png';
import BGBlue from './images/Container_Blue.png';
//import BGRed from './images/Container_Red.png';

import './Container.css';

const getContainerStyle = ({ left, bottom, next }: ContainerProps, index = 0) => {
  const width = getContainerWidth();
  const height = getContainerHeight();

  const imageStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`,
    bottom: `${bottom}px`,
    backgroundImage: `url(${next ? BGBlue : BGGreen})`,
    backgroundColor: `${next ? 'blue' : 'green'}`,
    zIndex: 10 + index // 10 normal, 11 drag, 12 drag active
  };

  return imageStyle;
};

type ContainerProps = {
  left: number;
  bottom: number;
  number: number;
  next?: boolean;
};

export const Container: React.FC<ContainerProps> = (props) => {
  return (
    <div className="container" style={getContainerStyle(props)}>
      <p>{props.number}</p>
    </div>
  );
};

type ContainerDragProps = ContainerProps & {
  parent?: any;
};

export const ContainerDrag: React.FC<ContainerDragProps> = (props) => {
  let [index, setIndex] = React.useState(1);
  const dispatch = useDispatch();
  const problem = useSelector((state: GlobalState) => state.problem);

  const width = getContainerWidth();
  const spacer = getContainerSpacer();

  const handleDrag = (problem: ProblemState, info: PanInfo) => {
    const left = props.left + info.point.x + (width + spacer) / 2;
    const oldIndex = Math.floor(props.left / (width + spacer));
    const newIndex = Math.floor(left / (width + spacer));

    // We are not over the limit
    if (problem.data[newIndex].length < problem.col_size && newIndex !== oldIndex) {
      startContainerAnimation(oldIndex, newIndex);
    } else {
      // Just reset shit up fam
      dispatch({ type: ProblemTypes.Update, payload: problem });
    }
  };

  return (
    <motion.div
      dragElastic={0}
      dragMomentum={false}
      onDragStart={() => {
        setIndex(2); // Set it above everything
      }}
      onDragEnd={(event, info) => {
        setIndex(1); // Set it above static ones
        handleDrag(problem, info);
      }}
      drag
      dragConstraints={props.parent}
      className="container drag"
      style={getContainerStyle(props, index)}
    >
      <p>{props.number}</p>
    </motion.div>
  );
};

export const ContainerAnimated: React.FC<ContainerProps> = (props) => {
  const { left, bottom, number } = props;
  const problem = useSelector((state: GlobalState) => state.problem);
  const { destIndex } = useSelector((state: GlobalState) => state.animated);

  const height = getContainerHeight();
  const width = getContainerWidth();
  const spacer = getContainerSpacer();

  let animate, transition;
  if (destIndex === -1) {
    const truckBed = (height * 3) / 8 + 5;
    animate = {
      bottom: [bottom, bottom, 360, 360, truckBed, -height / 2, 0],
      left: [left, left, left, 488.5, 488.5, 488.5, 488.5],
      scale: [1, 1, 1, 1, 1, 0, 0]
    };
    transition = getExtractTransition();
  } else {
    const destB = problem.data[destIndex].length * height;
    const destL = (spacer / 2) * (destIndex + 1) + (width + spacer / 2) * destIndex;

    animate = {
      bottom: [bottom, bottom, 360, 360, destB, destB, destB],
      left: [left, left, left, destL, destL, destL, destL]
    };
    transition = getMoveTransition();
  }

  return (
    <>
      <Ropes />
      <motion.div
        animate={animate}
        transition={transition}
        className="container"
        onAnimationComplete={endContainerAnimation}
        style={getContainerStyle(props)}
      >
        <p>{number}</p>
      </motion.div>
    </>
  );
};
