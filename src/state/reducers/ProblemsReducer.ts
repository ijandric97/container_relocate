import { ActionMap } from '../Reducer';
import { Problem } from './ProblemReducer';

export enum ProblemsTypes {
  Update = 'PROBLEMS_UPDATE'
}

type ProblemsPayload = {
  [ProblemsTypes.Update]: Problem[];
};

export type ProblemsActions = ActionMap<ProblemsPayload>[keyof ActionMap<ProblemsPayload>];

export const problemsReducer = (state: Problem[], action: ProblemsActions) => {
  switch (action.type) {
    case ProblemsTypes.Update:
      return action.payload;
    default:
      return state;
  }
};
