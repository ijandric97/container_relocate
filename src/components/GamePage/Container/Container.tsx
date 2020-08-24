import React, { CSSProperties } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useGlobalState } from '../../../state/GlobalState';
import { Problem, ProblemTypes } from '../../../state/reducers/ProblemReducer';
import { HistoryTypes } from '../../../state/reducers/HistoryReducer';
import { AnimatedTypes } from '../../../state/reducers/AnimatedReducer';

import Ropes from '../Ropes/Ropes';

import BGGreen from './images/Container_Green.png';
import BGBlue from './images/Container_Blue.png';
import BGRed from './images/Container_Red.png';

import './Container.css';

const getContainerStyle = ({ width, height, left, bottom, next }: ContainerProps, index = 0) => {
  const imageStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`,
    bottom: `${bottom}px`,
    backgroundImage: `url(${next ? BGBlue : BGGreen})`,
    backgroundColor: `${next ? 'blue' : 'green'}`,
    zIndex: 10 + index // 10 normal, 11 drag, 12 drag active
  };

  if (index === 69) imageStyle.backgroundImage = `url(${BGRed})`;

  return imageStyle;
};

type ContainerProps = {
  width: number;
  height: number;
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
  spacer: number;
  parent?: any;
};

export const ContainerDrag: React.FC<ContainerDragProps> = (props) => {
  let [index, setIndex] = React.useState(1);
  const {
    state: { problem },
    dispatch
  } = useGlobalState();

  const handleDrag = (problem: Problem, info: PanInfo) => {
    const left = props.left + info.point.x + (props.width + props.spacer) / 2;
    const oldIndex = Math.floor(props.left / (props.width + props.spacer));
    const newIndex = Math.floor(left / (props.width + props.spacer));

    // We are not over the limit
    if (problem.data[newIndex].length < problem.col_size + 2 && newIndex !== oldIndex) {
      // Push old problem to the history stack
      dispatch({
        type: HistoryTypes.Push,
        payload: problem
      });

      problem.data[oldIndex].shift(); // Remove old
      problem.data[newIndex].unshift(props.number); // Push in new
    }
    dispatch({
      type: ProblemTypes.Update,
      payload: problem
    });
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
        handleDrag(problem as Problem, info);
      }}
      drag
      dragConstraints={props.parent}
      className="container"
      style={getContainerStyle(props, index)}
    >
      <p>{props.number}</p>
    </motion.div>
  );
};

type ContainerAnimatedProps = ContainerProps & {
  spacer: number;
  parent?: any;
};

export const ContainerAnimated: React.FC<ContainerAnimatedProps> = (props) => {
  const { width, height, left, bottom, next } = props;
  const {
    state: { problem },
    dispatch
  } = useGlobalState();

  // TODO: Calculate this
  const animate = {
    bottom: [bottom, bottom, 510, 510, 0, -height / 2, 0],
    left: [left, left, left, 400, 400, 400, 400],
    scale: [1, 1, 1, 1, 1, 0, 0]
  };
  const transition = {
    duration: 7,
    ease: 'easeInOut',
    //times: [1, 1, 1, 1, 1, 1, 1],
    repeat: 1
  };

  // TODO: Perhaps this should be in a logic clas sor some shit u know?
  const endAnimation = () => {
    const myProblem = problem as Problem; // Stop ts from bitching honestly
    for (let i = 0; i < myProblem.data.length; i++) {
      for (let j = 0; j < myProblem.data[i].length; j++) {
        // Check only the first element
        const el = myProblem.data[i][0];

        // TODO: Add some kind of blocking for the animations :)
        if (el === myProblem.current) {
          myProblem.data[i].shift(); // Remove old
          myProblem.current = myProblem.current + 1; // Add to counter

          // Update the problem object
          dispatch({
            type: ProblemTypes.Update,
            payload: myProblem
          });
          // Clean the animation flag
          dispatch({
            type: AnimatedTypes.Clear,
            payload: null
          });
        }

        break;
      }
    }
  };

  return (
    <>
      <Ropes width={width} height={height} left={left} bottom={bottom} />
      <motion.div
        animate={animate}
        transition={transition}
        className="container"
        onAnimationComplete={endAnimation}
        style={getContainerStyle(props, 69)}
      >
        <p>{props.number}</p>
      </motion.div>
    </>
  );
};
