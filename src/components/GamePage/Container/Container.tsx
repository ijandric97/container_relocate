import React, { CSSProperties } from 'react';
import { motion, PanInfo } from 'framer-motion';

import BGGreen from './images/Container_Green.png';
import BGBlue from './images/Container_Blue.png';
import BGRed from './images/Container_Red.png';

import './Container.css';
import { useGlobalState } from '../../../state/GlobalState';
import { Problem, ProblemTypes } from '../../../state/reducers/ProblemReducer';
import { HistoryTypes } from '../../../state/reducers/HistoryReducer';

type ContainerProps = {
  width: number;
  height: number;
  left: number;
  bottom: number;
  number: number;
  next?: boolean;
};

type ContainerDragProps = ContainerProps & {
  spacer: number;
  parent?: any;
};

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

  //if (index >= 1) imageStyle.backgroundImage = `url(${BGRed})`;

  return imageStyle;
};

export const Container: React.FC<ContainerProps> = (props) => {
  return (
    <div className="container" style={getContainerStyle(props)}>
      <p>{props.number}</p>
    </div>
  );
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
      problem.data[newIndex].unshift({ value: props.number, color: 0 }); // Push in new
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
