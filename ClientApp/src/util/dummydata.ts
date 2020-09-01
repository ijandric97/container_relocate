import { ProblemState } from '../redux/reducers/ProblemReducer';

export const dummy_problems: ProblemState[] = [
  {
    row_size: 3,
    col_size: 3,
    current: 1,
    data: [[1, 7, 3], [5, 6, 2], [4]],
    solution: {
      isActive: false,
      current: 1,
      moves: [
        [1, 2],
        [1, 2],
        [0, 1],
        [2, 1],
        [2, 1]
      ]
    }
  },
  {
    row_size: 3,
    col_size: 3,
    current: 1,
    data: [
      [3, 4],
      [6, 5],
      [7, 2, 1]
    ],
    solution: {
      isActive: false,
      current: 1,
      moves: [
        [2, 1],
        [2, 0],
        [1, 0],
        [1, 0]
      ]
    }
  },
  {
    row_size: 4,
    col_size: 4,
    current: 1,
    data: [
      [11, 6, 1, 7],
      [2, 4, 10, 12],
      [9, 8, 5],
      [13, 3]
    ],
    solution: {
      isActive: false,
      current: 1,
      moves: [
        [0, 2],
        [0, 3],
        [3, 0],
        [3, 0],
        [0, 3],
        [2, 3],
        [2, 3],
        [2, 3]
      ]
    }
  }
];
