import React from 'react';
import { Problem } from '../../../state/reducers/ProblemReducer';

import BGGreen from '../../GamePage/Container/images/Container_Green.png';
import BGBlue from '../../GamePage/Container/images/Container_Blue.png';

import './ProblemGrid.css';

type ProblemProps = {
  num: number;
  problem: Problem;
};

const ProblemGrid: React.FC<ProblemProps> = (props) => {
  const { num } = props;
  const { current, col_size, row_size } = props.problem;

  const renderContainers = (problem: Problem) => {
    const problems = problem.data;

    let containers: JSX.Element[] = [];

    for (let i = 0; i < problems.length; i++) {
      for (let j = 0; j < problems[i].length; j++) {
        const value = problems[j][i];
        const style = { backgroundImage: `url(${value === current ? BGBlue : BGGreen})` };

        containers.push(
          <div key={`${i}.${j}`} className="cell" style={style}>
            <p>{value}</p>
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
