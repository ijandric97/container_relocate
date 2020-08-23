import React from 'react';
import { Problem } from '../../../state/reducers/ProblemReducer';

import ContainerBlue from '../../../assets/images/container_blue.jpg';
import ContainerGreen from '../../../assets/images/container_green.jpg';
import ContainerGrey from '../../../assets/images/container_grey.jpg';
import ContainerOrange from '../../../assets/images/container_orange.jpg';
import ContainerPurple from '../../../assets/images/container_purple.jpg';
import ContainerRed from '../../../assets/images/container_red.jpg';

import './ProblemGrid.css';

const bgImages: string[] = [
  ContainerBlue,
  ContainerGreen,
  ContainerGrey,
  ContainerOrange,
  ContainerPurple,
  ContainerRed
];

type ProblemProps = {
  num: number;
  problem: Problem;
};

//TODO: CHANGE TO DIVS BEFORE I LOSE MY SANITY
const ProblemGrid: React.FC<ProblemProps> = (props) => {
  const { num } = props;
  const { col_size, row_size } = props.problem;

  const renderContainers = (problem: Problem) => {
    const problems = problem.data;

    let containers: JSX.Element[] = [];

    for (let i = 0; i < problems.length; i++) {
      for (let j = 0; j < problems[i].length; j++) {
        const cell = problems[j][i];

        containers.push(
          <div
            key={`${i}.${j}`}
            className={`cell ${cell.value === null ? 'empty' : ''}`}
            style={{ backgroundImage: `url(${bgImages[cell.color ? cell.color : 0]})` }}
          >
            <p>{cell.value}</p>
          </div>
        );
      }
    }

    return containers;
  };

  return (
    <div className="problem">
      <div className="label">Problem #{num}</div>
      <div className={`table col${col_size} row${row_size}`}>{renderContainers(props.problem)}</div>
    </div>
  );
};

export default ProblemGrid;
