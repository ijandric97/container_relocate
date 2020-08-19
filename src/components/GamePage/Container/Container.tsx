import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';

import './Container.css';

type ContainerProps = {
  width: number;
  height: number;
  left: number;
  bottom: number;
  number: number;
  next?: boolean;
};

type ContainerDragProps = ContainerProps & {
  parent?: any;
};

export const Container: React.FC<ContainerProps> = ({ width, height, left, bottom, number, next }) => {
  const imageStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`,
    bottom: `${bottom}px`,
    backgroundColor: `${next ? 'blue' : 'green'}`
  };

  return (
    <div className="container" style={imageStyle}>
      <p>{number}</p>
    </div>
  );
};

export const ContainerDrag: React.FC<ContainerDragProps> = ({ width, height, left, bottom, number, next, parent }) => {
  let [index, setIndex] = React.useState(0);

  const imageStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`,
    bottom: `${bottom}px`,
    backgroundColor: `${next ? 'blue' : 'green'}`,
    zIndex: 10 + index
  };

  return (
    <motion.div
      dragElastic={0.5}
      dragMomentum={false}
      onDragStart={(event, info) => {
        console.log(info.point.x, info.point.y);
        setIndex(1);
      }}
      onDragEnd={(event, info) => {
        setIndex(0);
      }}
      drag
      dragConstraints={parent}
      className="container"
      style={imageStyle}
    >
      <p>{number}</p>
    </motion.div>
  );
};
