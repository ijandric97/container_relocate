import React, { CSSProperties, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../../redux/Store';
import { ProblemState } from '../../../redux/reducers/ProblemReducer';
import { nextIsOnTop, getContainerHeight, getContainerWidth, getContainerSpacer, doSolutionStep } from '../Game';
import { breaks } from '../../../util/misc';
import { Container, ContainerDrag, ContainerAnimated } from '../Container/Container';

import './ContainerGrid.css';

const ContainerGrid: React.FC = () => {
  const cr = useRef(null);

  const problem = useSelector((state: GlobalState) => state.problem);
  const client = useSelector((state: GlobalState) => state.client);
  const animated = useSelector((state: GlobalState) => state.animated);
  const settings = useSelector((state: GlobalState) => state.settings);

  const width = settings.grid_width;
  const height = settings.grid_height;

  // CHECK IF WE SHOULD REMOVE THE TOPMOST CONTAINER;
  useEffect(() => {
    nextIsOnTop(problem);
    doSolutionStep();
    // eslint-disable-next-line
  });

  const renderContainers = ({ col_size, row_size, current, data }: ProblemState) => {
    const spacer = getContainerSpacer();
    const h = getContainerHeight();
    const conW = getContainerWidth();

    let containers: JSX.Element[] = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const el = data[i][j];
        //! HACK: We put in random key so react cant recreate an object
        //! Recreated object would get applied previous translation (WE DONT WanT ThaT)
        const key = `${Date.now()}.${Math.random()}`;
        const next = el === current;
        const bot = (data[i].length - 1 - j) * h;
        const left = i * (conW + spacer) + spacer / 2;

        //? Top of the stack, should be draggable but not if we are animating boy :)
        if (j === 0 && i === animated.srcIndex && animated.isActive) {
          containers.push(<ContainerAnimated key={key} left={left} bottom={bot} number={el} next={next} />);
        } else if (j === 0 && !animated.isActive) {
          containers.push(<ContainerDrag key={key} left={left} bottom={bot} number={el} next={next} parent={cr} />);
        } else {
          containers.push(<Container key={key} left={left} bottom={bot} next={next} number={el} />);
        }
      }
    }

    return containers;
  };

  // Calculate where to put the grid
  let left = client.width / 2 - width * (2 / 3); // DESKTOP
  if (client.width < breaks.sm) left = client.width / 2 - width / 2; // MOBILE

  const ContainerGridStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`
  };

  return (
    <>
      <div className="containers" style={ContainerGridStyle} ref={cr}>
        {renderContainers(problem as ProblemState)}
      </div>
    </>
  );
};

export default ContainerGrid;
