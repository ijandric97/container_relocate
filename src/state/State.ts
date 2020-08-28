import { Client } from './reducers/ClientReducer';
import { Problem } from './reducers/ProblemReducer';
import { Settings } from './reducers/SettingsReducer';

export type State = {
  client: Client;
  problem: Problem | {};
  problems: Problem[];
  history: Problem[];
  animated: boolean;
  settings: Settings;
};

export const initialState: State = {
  client: {
    height: window.innerHeight,
    width: window.innerWidth
  },
  problem: {},
  problems: [],
  history: [],
  animated: false,
  settings: {
    animation_duration: 0.1, //! This is per step
    grid_height: 320,
    grid_width: 350
  }
};
