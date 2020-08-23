import React, { CSSProperties } from 'react';

import './Ground.css';

const Ground: React.FC<any> = (props) => {
  const groundStyle: CSSProperties = {
    background: `linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
    linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
    linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
    linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
    linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
    linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)`,
    backgroundColor: '#131313',
    backgroundSize: '20px 20px',

    position: 'absolute',
    width: '100%',
    height: '10px',
    left: '0',
    bottom: '50px',
    zIndex: 0
  };

  const brickStyle: CSSProperties = {
    backgroundColor: 'silver',
    backgroundImage: `linear-gradient(335deg, #b00 12px, transparent 12px),
    linear-gradient(155deg, #d00 12px, transparent 12px),
    linear-gradient(335deg, #b00 12px, transparent 12px),
    linear-gradient(155deg, #d00 12px, transparent 12px)`,
    backgroundSize: '30px 30px',
    backgroundPosition: '0px -15px, 2px 2px, 17px 0px, 19px -13px',
    backgroundRepeat: 'repeat',
    position: 'absolute',
    width: '100%',
    height: '50px',
    left: '0',
    bottom: '0px',
    zIndex: 0
  };

  return (
    <>
      <div className="" style={groundStyle} />
      <div className="" style={brickStyle} />
    </>
  );
};

export default Ground;
