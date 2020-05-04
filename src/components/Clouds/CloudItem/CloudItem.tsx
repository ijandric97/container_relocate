import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { debounce } from "../../../util/misc";

export type CloudItemProps = {
  top: number;
  width: number;
  reverse: boolean;
};

export const CloudItem: React.FC<CloudItemProps> = props => {
  const { top, width, reverse } = props;

  const [winSize, setWinSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    const handleResize = () => {
      setWinSize({
        height: window.innerHeight,
        width: window.innerWidth
      });
    };

    window.addEventListener("resize", debounce(handleResize, 100));

    return () =>
      window.removeEventListener("resize", debounce(handleResize, 100));
  });

  const cloudStyle: React.CSSProperties = {
    background: `linear-gradient(#ffffff 50%, rgba(255, 255, 255, 0) 0) 0 0,
    radial-gradient(circle closest-side, #ffffff 50%, #ffffff00 0) 0px 0px,
    radial-gradient(circle closest-side, #000000 53%, #ffffff00 0) 0px 0px,
    radial-gradient(circle closest-side, #ffffff 50%, #ffffff00 0) ${width /
      2}px 0px,
    radial-gradient(circle closest-side, #000000 53%, #ffffff00 0) ${width /
      2}px 0px`,
    backgroundSize: `${width}px 200px`,
    backgroundRepeat: `repeat-x`,
    filter: `blur(0.5px) sepia(100%)`,
    position: `absolute`,
    top: `${top}px`,
    left: `-50%`,
    width: `200%`,
    height: `200px`,
    zIndex: -1
  };

  const cloudAnimate = {
    x: reverse ? `${width}px` : `-${width}px`
  };

  const cloudTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 10,
    delay: 0
  };

  return (
    <motion.div
      style={cloudStyle}
      animate={cloudAnimate}
      transition={cloudTransition}
    />
  );
};

export default CloudItem;
