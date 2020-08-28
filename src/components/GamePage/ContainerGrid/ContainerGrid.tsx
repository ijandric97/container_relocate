import React, { CSSProperties, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { breaks } from '../../../util/misc';

import { Container, ContainerDrag, ContainerAnimated } from '../Container/Container';

import './ContainerGrid.css';
import { ProblemState } from '../../../redux/reducers/ProblemReducer';
import { AnimatedTypes } from '../../../redux/reducers/AnimatedReducer';
import { GlobalState } from '../../../redux/Store';

type ContainerGridProps = {
  height: number;
  width: number;
};

const ContainerGrid: React.FC<ContainerGridProps> = ({ height, width }) => {
  const constraintsRef = useRef(null);

  const dispatch = useDispatch();
  const problem = useSelector((state: GlobalState) => state.problem);
  const client = useSelector((state: GlobalState) => state.client);
  const animated = useSelector((state: GlobalState) => state.animated);

  // CHECK IF WE SHOULD REMOVE THE TOPMOST CONTAINER;
  useEffect(() => {
    const myProblem = problem as ProblemState; // Stop ts from bitching honestly
    for (let i = 0; i < myProblem.data.length; i++) {
      for (let j = 0; j < myProblem.data[i].length; j++) {
        // Check only the first element
        const el = myProblem.data[i][0];

        // TODO: Add some kind of blocking for the animations :)
        if (el === myProblem.current && !animated.isActive) {
          //TODO: this should be done after animation ends boyyo :)
          /* myProblem.data[i].shift(); // Remove old
          myProblem.current = myProblem.current + 1; // Add to counter

          
          // Update the problem object
          dispatch({
            type: ProblemTypes.Update,
            payload: myProblem
          }); */
          dispatch({
            type: AnimatedTypes.Start,
            payload: null
          });
        }

        break;
      }
    }
    // eslint-disable-next-line
  });

  const renderContainers = ({ col_size, row_size, current, data }: ProblemState) => {
    const spacer = (width / row_size) * 0.1;
    const conH = height / col_size;
    const conW = width / row_size - spacer;

    let containers: JSX.Element[] = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const el = data[i][j];
        const bottom = (data[i].length - 1 - j) * conH;
        const left = i * (conW + spacer) + spacer / 2;

        // Top of the stack, should be draggable but not if we are animating boy :)
        if (el === current && animated.isActive) {
          containers.push(
            <ContainerAnimated
              //! HACK: We put in random key so react cant recreate an object
              //! Recreated object would get applied previous translation (WE DONT WanT ThaT)
              key={`${Date.now()}.${Math.random()}`}
              width={conW}
              height={conH}
              left={left}
              bottom={bottom}
              number={el}
              next={el === current}
              spacer={spacer}
              parent={constraintsRef}
            />
          );
        } else if (j === 0 && !animated.isActive) {
          containers.push(
            <ContainerDrag
              key={`${Date.now()}.${Math.random()}`}
              width={conW}
              height={conH}
              left={left}
              bottom={bottom}
              number={el}
              next={el === current}
              spacer={spacer}
              parent={constraintsRef}
            />
          );
        } else {
          containers.push(
            <Container
              key={`${Date.now()}.${Math.random()}`}
              width={conW}
              height={conH}
              left={left}
              bottom={bottom}
              next={el === current}
              number={el}
            />
          );
        }
      }
    }

    return containers;
  };

  // Calculate where to put them
  let left = client.width / 2 - width * (2 / 3); // DESKTOP
  if (client.width < breaks.sm) {
    left = client.width / 2 - width / 2; // MOBILE
  }

  const ContainerGridStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`
  };

  return (
    <div className="containers" style={ContainerGridStyle} ref={constraintsRef}>
      {renderContainers(problem as ProblemState)}
    </div>
  );
};

export default ContainerGrid;
