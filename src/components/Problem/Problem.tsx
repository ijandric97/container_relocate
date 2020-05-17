import React from "react";
import ContainerBlue from "../../images/container_blue.jpg";
import ContainerGreen from "../../images/container_green.jpg";
import ContainerGrey from "../../images/container_grey.jpg";
import ContainerOrange from "../../images/container_orange.jpg";
import ContainerPurple from "../../images/container_purple.jpg";
import ContainerRed from "../../images/container_red.jpg";
import "./Problem.css";

const bgImages: string[] = [
  ContainerBlue,
  ContainerGreen,
  ContainerGrey,
  ContainerOrange,
  ContainerPurple,
  ContainerRed
];

type ProblemData = {
  value: number | null;
  color: number | null;
};

type Problem = {
  col_size: number;
  row_size: number;
  data: ProblemData[][];
};

type ProblemProps = {
  num: number;
  problem: Problem;
};

//TODO: CHANGE TO DIVS BEFORE I LOSE MY SANITY

const Problem: React.FC<ProblemProps> = props => {
  console.log(props);
  const { num } = props;
  const { col_size, row_size, data } = props.problem;

  const rows = data.map((row, index) => {
    const cells = row.map((cell, index) => {
      if (cell.value === null || cell.color === null) {
        return (
          <td
            key={index}
            className={`problem__cell problem__cell--${row_size} problem__cell--empty`}
          />
        );
      } else {
        return (
          <td
            key={index}
            className={`problem__cell problem__cell--${row_size}`}
            style={{ backgroundImage: `url(${bgImages[cell.color]})` }}
          >
            {cell.value}
          </td>
        );
      }
    });

    return <tr key={index}>{cells}</tr>;
  });

  return (
    <div className="problem__main">
      <table className="problem__table">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Problem;
