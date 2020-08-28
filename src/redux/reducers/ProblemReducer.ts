import { ActionMap } from '../Store';

//? State
export type Solution = {
  isActive: boolean;
  current: number;
  moves: [number, number][]; // Tuple array
};
export type ProblemState = {
  col_size: number;
  row_size: number;
  current: number;
  data: number[][];
  solution: Solution;
};
const initialState: ProblemState | {} = {};

//? Action
export enum ProblemTypes {
  Update = 'PROBLEM_UPDATE'
}
type ProblemPayload = {
  [ProblemTypes.Update]: ProblemState;
};
export type ProblemActions = ActionMap<ProblemPayload>[keyof ActionMap<ProblemPayload>];

export const problemReducer = (state: ProblemState | {} = initialState, action: ProblemActions) => {
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
