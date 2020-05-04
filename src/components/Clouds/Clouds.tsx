import React from "react";
import { CloudItem, CloudItemProps } from "./CloudItem/CloudItem";

const Clouds: React.FC<any> = () => {
  const CloudList: CloudItemProps[] = [
    { top: -75, width: 40, reverse: false },
    { top: -80, width: 60, reverse: true },
    { top: -90, width: 80, reverse: false },
    { top: -100, width: 100, reverse: true }
  ];

  const CloudsList = CloudList.map((cloud, index) => {
    return (
      <CloudItem
        key={index}
        top={cloud.top}
        width={cloud.width}
        reverse={cloud.reverse}
      />
    );
  });

  return <React.Fragment>{CloudsList}</React.Fragment>;
};

export default Clouds;
