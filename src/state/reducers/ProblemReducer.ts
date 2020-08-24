import { ActionMap } from '../Reducer';

export type Problem = {
  col_size: number;
  row_size: number;
  current: number;
  data: number[][];
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
      try {
        //! Some sort of DeepClone, if this doesnt work use Loadash pls
        return JSON.parse(JSON.stringify(action.payload));
      } catch (error) {
        console.log(error);
        return state;
      }
    default:
      return state;
  }
};
