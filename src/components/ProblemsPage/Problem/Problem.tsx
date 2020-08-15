import React from "react";
import ContainerBlue from "../../../assets/images/container_blue.jpg";
import ContainerGreen from "../../../assets/images/container_green.jpg";
import ContainerGrey from "../../../assets/images/container_grey.jpg";
import ContainerOrange from "../../../assets/images/container_orange.jpg";
import ContainerPurple from "../../../assets/images/container_purple.jpg";
import ContainerRed from "../../../assets/images/container_red.jpg";
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

const Problem: React.FC<ProblemProps> = (props) => {
  console.log(props);
  const { num } = props;
  const { col_size, row_size, data } = props.problem;

  const rows = data.map((row, index) => {
    const cells = row.map((cell, index) => {
      return (
        <div
          key={index}
          className={`problem__cell ${
            cell.value === null ? "problem__cell--empty" : ""
          }`}
          style={{ backgroundImage: `url(${bgImages[cell.color]})` }}
        >
          <p>{cell.value}</p>
        </div>
      );
    });

    return cells;
  });

  return (
    <div className="problem">
      <div className="problem__label">Problem #{num}</div>
      <div
        className={`problem__table problem__table--col${col_size} problem__table--row${row_size}`}
      >
        {rows}
      </div>
    </div>
  );
};

export default Problem;
