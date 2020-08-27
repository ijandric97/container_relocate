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
    const data = problem.data;

    const width = 300 / problem.col_size;
    const height = 300 / problem.row_size;

    let containers: JSX.Element[] = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const value = data[i][j];
        const bottom = (data[i].length - 1 - j) * height;
        const left = i * width;
        const style = {
          width: width,
          height: height,
          bottom: bottom,
          left: left,
          backgroundImage: `url(${value === current ? BGBlue : BGGreen})`
        };

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
      <div className={`table`}>{renderContainers(props.problem)}</div>
    </div>
  );
};

export default ProblemGrid;
