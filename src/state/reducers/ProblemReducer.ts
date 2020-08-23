import { ActionMap } from '../Reducer';

export type ProblemData = {
  value: number;
  color: number;
};

export type Problem = {
  col_size: number;
  row_size: number;
  current: number;
  data: ProblemData[][];
};

export enum ProblemTypes {
  Update = 'PROBLEM_UPDATE'
}

type ProblemPayload = {
  [ProblemTypes.Update]: Problem;
};

export type ProblemActions = ActionMap<ProblemPayload>[keyof ActionMap<ProblemPayload>];

export const problemReducer = (state: Problem | {}, action: ProblemActions) => {
  switch (action.type) {
    case ProblemTypes.Update:
      console.log(`problemReducer: ${action.payload}`);
      return JSON.parse(JSON.stringify(action.payload));
    default:
      return state;
  }
};
