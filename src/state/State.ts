import { Client } from './reducers/ClientReducer';
import { Problem } from './reducers/ProblemReducer';

export type State = {
  client: Client;
  problem: Problem | {};
  problems: Problem[];
  history: Problem[];
  animated: boolean;
};

export const initialState: State = {
  client: {
    height: window.innerHeight,
    width: window.innerWidth
  },
  problem: {},
  problems: [],
  history: [],
  animated: false
};
