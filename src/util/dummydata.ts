import { Problem } from '../state/reducers/ProblemReducer';

export const dummy_problems: Problem[] = [
  {
    row_size: 3,
    col_size: 3,
    current: 1,
    data: [
      [
        { value: 1, color: 0 },
        { value: 1, color: 1 },
        { value: 1, color: 2 }
      ],
      [
        { value: 1, color: 3 },
        { value: 1, color: 4 },
        { value: 1, color: 5 }
      ],
      [
        { value: 1, color: 0 },
        { value: 1, color: 2 },
        { value: 1, color: 3 }
      ]
    ]
  },
  {
    row_size: 3,
    col_size: 3,
    current: 1,
    data: [
      [
        { value: 1, color: 0 },
        { value: 7, color: 1 },
        { value: 3, color: 2 }
      ],
      [
        { value: 5, color: 3 },
        { value: 6, color: 4 },
        { value: 2, color: 5 }
      ],
      [
        { value: 4, color: 0 },
        { value: 9, color: 2 },
        { value: 8, color: 3 }
      ]
    ]
  },
  {
    row_size: 3,
    col_size: 3,
    current: 1,
    data: [
      [
        { value: 3, color: 0 },
        { value: 4, color: 1 },
        { value: 8, color: 2 }
      ],
      [
        { value: 9, color: 3 },
        { value: 6, color: 4 },
        { value: 5, color: 5 }
      ],
      [
        { value: 7, color: 0 },
        { value: 2, color: 2 },
        { value: 1, color: 3 }
      ]
    ]
  },
  {
    row_size: 4,
    col_size: 4,
    current: 1,
    data: [
      [
        { value: 1, color: 0 },
        { value: 2, color: 1 },
        { value: 3, color: 2 },
        { value: 4, color: 2 }
      ],
      [
        { value: 5, color: 3 },
        { value: 6, color: 4 },
        { value: 7, color: 5 },
        { value: 8, color: 2 }
      ],
      [
        { value: 9, color: 0 },
        { value: 10, color: 2 },
        { value: 11, color: 3 },
        { value: 12, color: 2 }
      ],
      [
        { value: 13, color: 0 },
        { value: 14, color: 2 },
        { value: 15, color: 3 },
        { value: 16, color: 2 }
      ]
    ]
  }
];
