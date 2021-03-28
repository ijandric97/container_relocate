import { ActionMap } from '../Store';

//? State
export type Solution = {
  isActive: boolean;
  current: number;
  moves: [number, number][]; // Tuple array
};
export type ProblemState = {
  id: number;
  col_size: number;
  row_size: number;
  current: number;
  data: number[][];
  original: number[][];
  solution: Solution;
};
const initialState: ProblemState | {} = {};

//? Action
export enum ProblemTypes {
  Update = 'PROBLEM_UPDATE',
  Reset = 'PROBLEM_RESET',
  Solution = 'PROBLEM_SOLUTION'
}
type ProblemPayload = {
  [ProblemTypes.Update]: ProblemState;
  [ProblemTypes.Reset]: any;
  [ProblemTypes.Solution]: Solution;
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
    case ProblemTypes.Reset:
      const myState = state as ProblemState;
      return { ...state, current: 1, data: JSON.parse(JSON.stringify(myState.original)) };
    case ProblemTypes.Solution:
      return { ...state, solution: action.payload };
    default:
      return state;
  }
};
