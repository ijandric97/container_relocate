import React, { CSSProperties, useRef } from 'react';
import { useGlobalState } from '../../../state/GlobalState';
import { Problem } from '../../../state/reducers/ProblemReducer';

import { Container, ContainerDrag } from '../Container/Container';

import './ContainerGrid.css';
import { breaks } from '../../../util/misc';

type ContainerGridProps = {
  height: number;
  width: number;
};

const ContainerGrid: React.FC<ContainerGridProps> = ({ height, width }) => {
  const constraintsRef = useRef(null);
  const {
    state: { client, problem }
  } = useGlobalState();

  let left = client.width / 2 - width * (2 / 3); // DESKTOP
  if (client.width < breaks.sm) {
    left = client.width / 2 - width / 2; // MOBILE
  }

  const ContainerGridStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`
  };

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

        // Top of the stack, should be draggable
        if (j === 0) {
          console.log(data[i][j]);
          containers.push(
            <ContainerDrag
              key={`${i}.${j}`}
              width={conW}
              height={conH}
              left={left}
              bottom={bottom}
              number={el.value}
              next={el.value === current}
              parent={constraintsRef}
            />
          );
        } else {
          containers.push(
            <Container
              key={`${i}.${j}`}
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

  return (
    <div className="containers" style={ContainerGridStyle} ref={constraintsRef}>
      {renderContainers(problem as Problem)}
    </div>
  );
};

export default ContainerGrid;
