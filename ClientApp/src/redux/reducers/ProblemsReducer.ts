import { ActionMap } from '../Store';
import { ProblemState } from './ProblemReducer';

//? State
export type ProblemsState = ProblemState[];
const initialState: ProblemsState = [];

//? Action
export enum ProblemsTypes {
  Update = 'PROBLEMS_UPDATE',
  Clear = 'PROBLEMS_CLEAR',
  Add = 'PROBLEMS_ADD'
}
type ProblemsPayload = {
  [ProblemsTypes.Update]: ProblemsState;
  [ProblemsTypes.Clear]: any;
  [ProblemsTypes.Add]: ProblemState;
};
export type ProblemsActions = ActionMap<ProblemsPayload>[keyof ActionMap<ProblemsPayload>];

export const problemsReducer = (state: ProblemsState = initialState, action: ProblemsActions) => {
  switch (action.type) {
    case ProblemsTypes.Add:
      return [...state, action.payload];
    case ProblemsTypes.Update:
      return action.payload;
    case ProblemsTypes.Clear:
      return initialState;
    default:
      return state;
  }
};
