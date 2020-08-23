import { State } from './State';

import { ClientActions, clientReducer } from './reducers/ClientReducer';
import { ProblemActions, problemReducer } from './reducers/ProblemReducer';
import { ProblemsActions, problemsReducer } from './reducers/ProblemsReducer';
import { historyReducer, HistoryActions } from './reducers/HistoryReducer';
import { animatedReducer, AnimatedActions } from './reducers/AnimatedReducer';

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Actions = ClientActions | ProblemActions | ProblemsActions | HistoryActions | AnimatedActions;

export const mainReducer = (state: State, action: Actions) => ({
  client: clientReducer(state.client, action as ClientActions),
  problem: problemReducer(state.problem, action as ProblemActions),
  problems: problemsReducer(state.problems, action as ProblemsActions),
  history: historyReducer(state.history, action as HistoryActions),
  animated: animatedReducer(state.animated, action as AnimatedActions)
});
