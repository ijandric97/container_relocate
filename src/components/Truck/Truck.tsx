import React, { CSSProperties } from "react";
import TruckImg from "./images/truck.png";

const Truck: React.FC<any> = () => {
  const TruckStyle: CSSProperties = {
    position: "absolute",
    bottom: "60px",
    left: "900px",
    width: `${1240 * 0.15}px`,
    height: `${1112 * 0.15}px`
  };

  return <img style={TruckStyle} src={TruckImg} />;
};

export default Truck;
