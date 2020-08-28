import { ProblemState } from '../redux/reducers/ProblemReducer';

export const dummy_problems: ProblemState[] = [
  {
    row_size: 3,
    col_size: 3,
    current: 1,
    data: [[], [], [1]],
    solution: {
      isActive: false,
      current: 1,
      moves: []
    }
  },
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
      [3, 4, 8],
      [9, 6, 5],
      [7, 2, 1]
    ],
    solution: {
      isActive: false,
      current: 1,
      moves: []
    }
  },
  {
    row_size: 4,
    col_size: 4,
    current: 1,
    data: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ],
    solution: {
      isActive: false,
      current: 1,
      moves: []
    }
  }
];
