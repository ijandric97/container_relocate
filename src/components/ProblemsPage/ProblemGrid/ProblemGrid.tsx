import React from 'react';
import { ProblemState } from '../../../redux/reducers/ProblemReducer';

import BGGreen from '../../GamePage/Container/images/Container_Green.png';
import BGBlue from '../../GamePage/Container/images/Container_Blue.png';

import './ProblemGrid.css';

type ProblemProps = {
  num: number;
  problem: ProblemState;
};

const ProblemGrid: React.FC<ProblemProps> = ({ num, problem }) => {
  const renderContainers = ({ data, col_size, row_size }: ProblemState) => {
    const width = 300 / col_size;
    const height = 300 / row_size;

    let containers: JSX.Element[] = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const value = data[i][j];
        const bottom = (data[i].length - 1 - j) * height;
        const left = i * width;
        const style = {
          width: width - 2, //? Because of the border 1px on each side
          height: height - 2, //? Because of the border 1px on each side
          bottom: bottom,
          left: left,
          backgroundImage: `url(${value === problem.current ? BGBlue : BGGreen})`
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
      <div className={`table`}>{renderContainers(problem)}</div>
    </div>
  );
};

export default ProblemGrid;
