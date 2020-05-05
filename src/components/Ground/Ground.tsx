import React, { CSSProperties } from "react";

const Ground: React.FC<any> = props => {
  const groundStyle: CSSProperties = {
    background: `linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
    linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
    linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
    linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
    linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
    linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)`,
    backgroundColor: "#131313",
    backgroundSize: "20px 20px",

    position: "absolute",
    width: "100%",
    height: "10px",
    left: "0",
    bottom: "50px",
    zIndex: -1
  };

  const brickStyle: CSSProperties = {
    backgroundColor: "silver",
    backgroundImage: `linear-gradient(335deg, #b00 23px, transparent 23px),
    linear-gradient(155deg, #d00 23px, transparent 23px),
    linear-gradient(335deg, #b00 23px, transparent 23px),
    linear-gradient(155deg, #d00 23px, transparent 23px)`,
    backgroundSize: "58px 58px",
    backgroundPosition: "0px 2px, 4px 35px, 29px 31px, 34px 6px",
    position: "absolute",
    width: "100%",
    height: "50px",
    left: "0",
    bottom: "0px",
    zIndex: -1
  };

  return (
    <>
      <div style={groundStyle} />
      <div style={brickStyle} />
    </>
  );
};

export default Ground;
