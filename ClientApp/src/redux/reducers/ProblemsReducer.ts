import { ActionMap } from '../Store';
import { ProblemState } from './ProblemReducer';

//? State
export type ProblemsState = ProblemState[];
const initialState: ProblemsState = [];

//? Action
export enum ProblemsTypes {
  Update = 'PROBLEMS_UPDATE'
}
type ProblemsPayload = {
  [ProblemsTypes.Update]: ProblemsState;
};
export type ProblemsActions = ActionMap<ProblemsPayload>[keyof ActionMap<ProblemsPayload>];

export const problemsReducer = (state: ProblemsState = initialState, action: ProblemsActions) => {
  switch (action.type) {
    case ProblemsTypes.Update:
      return action.payload;
    default:
      return state;
  }
};
