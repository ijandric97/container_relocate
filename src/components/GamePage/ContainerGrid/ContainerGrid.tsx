import React, { CSSProperties, useRef, useEffect } from 'react';
import { useGlobalState } from '../../../state/GlobalState';
import { Problem, ProblemTypes } from '../../../state/reducers/ProblemReducer';
import { AnimatedTypes } from '../../../state/reducers/AnimatedReducer';
import { breaks } from '../../../util/misc';

import { Container, ContainerDrag, ContainerAnimated } from '../Container/Container';

import './ContainerGrid.css';

type ContainerGridProps = {
  height: number;
  width: number;
};

const ContainerGrid: React.FC<ContainerGridProps> = ({ height, width }) => {
  const constraintsRef = useRef(null);
  const {
    state: { client, problem, animated },
    dispatch
  } = useGlobalState();

  // CHECK IF WE SHOULD REMOVE THE TOPMOST CONTAINER;
  useEffect(() => {
    const myProblem = problem as Problem; // Stop ts from bitching honestly
    for (let i = 0; i < myProblem.data.length; i++) {
      for (let j = 0; j < myProblem.data[i].length; j++) {
        // Check only the first element
        const el = myProblem.data[i][0];

        // TODO: Add some kind of blocking for the animations :)
        if (el.value === myProblem.current && !animated) {
          //TODO: this should be done after animation ends boyyo :)
          /* myProblem.data[i].shift(); // Remove old
          myProblem.current = myProblem.current + 1; // Add to counter

          
          // Update the problem object
          dispatch({
            type: ProblemTypes.Update,
            payload: myProblem
          }); */

          dispatch({
            type: AnimatedTypes.Set,
            payload: true
          });
        }

        break;
      }
    }
    // eslint-disable-next-line
  });

  const renderContainers = ({ col_size, row_size, current, data }: Problem) => {
    const spacer = (width / row_size) * 0.1;
    const conH = height / (col_size + 2);
    const conW = width / row_size - spacer;

    let containers: JSX.Element[] = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const el = data[i][j];
        const bottom = (data[i].length - 1 - j) * conH;
        const left = i * (conW + spacer) + spacer / 2;

        // Top of the stack, should be draggable but not if we are animating boy :)
        if (el.value === current && animated) {
          containers.push(
            <ContainerAnimated
              /* key={`${i}.${j}`} */
              // HACK: We put in random key so react cant recreate an object
              // Recreated object would get applied previous translation (WE DONT WanT ThaT)
              key={`${Date.now()}.${Math.random()}`}
              width={conW}
              height={conH}
              left={left}
              bottom={bottom}
              number={el.value}
              next={el.value === current}
              spacer={spacer}
              parent={constraintsRef}
            />
          );
        } else if (j === 0 && !animated) {
          containers.push(
            <ContainerDrag
              /* key={`${i}.${j}`} */
              // HACK: We put in random key so react cant recreate an object
              // Recreated object would get applied previous translation (WE DONT WanT ThaT)
              key={`${Date.now()}.${Math.random()}`}
              width={conW}
              height={conH}
              left={left}
              bottom={bottom}
              number={el.value}
              next={el.value === current}
              spacer={spacer}
              parent={constraintsRef}
            />
          );
        } else {
          containers.push(
            <Container
              /* key={`${i}.${j}`} */
              // HACK: We put in random key so react cant recreate an object
              // Recreated object would get applied previous translation (WE DONT WanT ThaT)
              key={`${Date.now()}.${Math.random()}`}
              width={conW}
              height={conH}
              left={left}
              bottom={bottom}
              next={el.value === current}
              number={el.value}
            />
          );
        }
      }
    }

    return containers;
  };

  console.log(animated);

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
      {renderContainers(problem as Problem)}
    </div>
  );
};

export default ContainerGrid;
