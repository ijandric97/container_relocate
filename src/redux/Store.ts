import { combineReducers, createStore } from 'redux';

import { animatedReducer, AnimatedState } from './reducers/AnimatedReducer';
import { clientReducer, ClientState } from './reducers/ClientReducer';
import { historyReducer, HistoryState } from './reducers/HistoryReducer';
import { problemReducer, ProblemState } from './reducers/ProblemReducer';
import { problemsReducer, ProblemsState } from './reducers/ProblemsReducer';
import { SettingsState, settingsReducer } from './reducers/SettingsReducer';

/**
 * Allows us to gently map enum with types and enum with payloads into action object
 */
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

export type GlobalState = {
  animated: AnimatedState;
  client: ClientState;
  history: HistoryState;
  problem: ProblemState;
  problems: ProblemsState;
  settings: SettingsState;
};

export const rootReducer = combineReducers<GlobalState>({
  animated: animatedReducer,
  client: clientReducer,
  history: historyReducer,
  problem: problemReducer,
  problems: problemsReducer,
  settings: settingsReducer
});

export const store = createStore(rootReducer);

export default store;
