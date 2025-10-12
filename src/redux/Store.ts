import { combineReducers } from 'redux';

import { animatedReducer, AnimatedState } from './reducers/AnimatedReducer';
import { clientReducer, ClientState } from './reducers/ClientReducer';
import { historyReducer, HistoryState } from './reducers/HistoryReducer';
import { problemReducer, ProblemState } from './reducers/ProblemReducer';
import { problemsReducer, ProblemsState } from './reducers/ProblemsReducer';
import { SettingsState, settingsReducer } from './reducers/SettingsReducer';
import { configureStore } from '@reduxjs/toolkit';

export type GlobalState = {
  animated: AnimatedState;
  client: ClientState;
  history: HistoryState;
  problem: ProblemState;
  problems: ProblemsState;
  settings: SettingsState;
};

export const rootReducer = combineReducers({
  animated: animatedReducer,
  client: clientReducer,
  history: historyReducer,
  problem: problemReducer,
  problems: problemsReducer,
  settings: settingsReducer
});

export const store = configureStore({ reducer: rootReducer, devTools: true });

export default store;
