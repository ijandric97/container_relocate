import { Client } from "./reducers/ClientReducer";
import { Problem } from "./reducers/ProblemReducer";

export type State = {
  client: Client;
  problem: Problem | {};
};

export const initialState: State = {
  client: {
    height: window.innerHeight,
    width: window.innerWidth
  },
  problem: {}
};
