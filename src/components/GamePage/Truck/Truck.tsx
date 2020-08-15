import React, { CSSProperties } from "react";
import { useGlobalState } from "../../../state/GlobalState";
import {
  motion,
  TargetAndTransition,
  Transition,
  Variant,
  useCycle
} from "framer-motion";
import { breaks } from "../../../util/misc.ts";

import "./Truck.css";

import TruckImg from "./images/truck_mobile.png";
import TruckContainer from "./images/truck_container.png";

// ! MOBILE
const TruckMobileWidth = 263;

const Truck: React.FC<void> = () => {
  const {
    state: { client }
  } = useGlobalState();

  const TruckStyle: CSSProperties = {
    position: "absolute",
    bottom: "48px",
    left: `${client.width + 100}px`,
    zIndex: 91
  };

  const truckAnimate: TargetAndTransition = {
    //x: `${-client.width - breaks.sm}px`
    left: "-300px"
  };

  const truckTransition: Transition = {
    loop: Infinity,
    ease: "linear",
    duration: 3,
    delay: 0
  };

  const ContainerCSS: CSSProperties = {
    position: "absolute",
    left: "90px",
    bottom: "50px",
    zIndex: 1
  };

  // Animate the div that contains both the truck and our image
  return (
    <motion.div
      style={TruckStyle}
      animate={truckAnimate}
      transition={truckTransition}
    >
      <img draggable="false" src={TruckImg} alt="Truck" />
      <img
        draggable="false"
        style={ContainerCSS}
        src={TruckContainer}
        alt="Container"
      />
    </motion.div>
  );
};

export default Truck;
