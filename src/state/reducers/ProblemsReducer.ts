import { ActionMap } from '../Reducer';

type ProblemData = {
  value: number | null;
  color: number | null;
};

type Problem = {
  col_size: number;
  row_size: number;
  data: ProblemData[][];
};

export enum ProblemsTypes {
  Update = 'PROBLEMS_UPDATE'
}

type ProblemsPayload = {
  [ProblemsTypes.Update]: Problem[];
};

export type ProblemsActions = ActionMap<ProblemsPayload>[keyof ActionMap<ProblemsPayload>];

export const problemsReducer = (state: Problem[] | {}, action: ProblemsActions) => {
  switch (action.type) {
    case ProblemsTypes.Update:
      return action.payload;
    default:
      return state;
  }
};
