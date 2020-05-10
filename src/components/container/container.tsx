import React from "react";
import { motion } from "framer-motion";
import ContainerBlue from "./images/container_blue.jpg";
import ContainerGreen from "./images/container_green.jpg";
import ContainerGrey from "./images/container_grey.jpg";
import ContainerOrange from "./images/container_orange.jpg";
import ContainerPurple from "./images/container_purple.jpg";
import ContainerRed from "./images/container_red.jpg";

type ContainerProps = {
  number: number;
  color: number;
  parent?: any;
};

const Container: React.FC<ContainerProps> = props => {
  let { number, color, parent } = props;
  let [index, setIndex] = React.useState("0");

  const bgImages: string[] = [
    ContainerBlue,
    ContainerGreen,
    ContainerGrey,
    ContainerOrange,
    ContainerPurple,
    ContainerRed
  ];

  const scale = 1;

  let imageStyle = {
    width: `${128 * scale}px`,
    height: `${160 * scale}px`,
    backgroundImage: `url(${bgImages[color]})`,
    backgroundSize: "100% 100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "solid black 2px",
    position: "relative",
    zIndex: index
  };

  const textStyle = {
    color: "white",
    fontFamily: "Impact",
    fontSize: "300%"
  };

  return (
    <motion.div
      dragElastic={0.5}
      dragMomentum={false}
      onDragStart={(event, info) => {
        console.log(info.point.x, info.point.y);
        setIndex("1");
      }}
      onDragEnd={(event, info) => {
        setIndex("0");
      }}
      drag
      dragConstraints={parent}
      style={imageStyle}
    >
      <p style={textStyle}>{number}</p>
    </motion.div>
  );
  //return <img src={ContainerBlue} alt="Logo" />;
};

export default Container;
