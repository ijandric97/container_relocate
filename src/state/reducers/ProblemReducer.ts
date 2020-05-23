import { ActionMap } from "../Reducer";

export type ProblemData = {
  value: number | null;
  color: number | null;
};

export type Problem = {
  col_size: number;
  row_size: number;
  data: ProblemData[][];
};

export enum ProblemTypes {
  Update = "PROBLEM_UPDATE"
}

type ProblemPayload = {
  [ProblemTypes.Update]: Problem;
};

export type ProblemActions = ActionMap<ProblemPayload>[keyof ActionMap<
  ProblemPayload
>];

export const problemReducer = (state: Problem | {}, action: ProblemActions) => {
  switch (action.type) {
    case ProblemTypes.Update:
    default:
      return state;
  }
};
