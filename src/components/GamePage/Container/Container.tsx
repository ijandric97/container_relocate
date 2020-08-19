import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';

import BGGreen from './images/Container_Green.png';
import BGBlue from './images/Container_Blue.png';

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

  return (
    <motion.div
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={(event, info) => {
        setIndex(2); // Set it above everything
      }}
      onDragEnd={(event, info) => {
        setIndex(1); // Set it above static ones
        console.log(info.point.x, info.point.y); //Add logic to move this shit somewhere else
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
