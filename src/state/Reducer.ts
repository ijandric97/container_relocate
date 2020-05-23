import { State } from "./State";

import { ClientActions, clientReducer } from "./reducers/ClientReducer";
import { ProblemActions, problemReducer } from "./reducers/ProblemReducer";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

export type Actions = ClientActions | ProblemActions;

export const mainReducer = ({ client, problem }: State, action: Actions) => ({
  client: clientReducer(client, action as ClientActions),
  problem: problemReducer(problem, action as ProblemActions)
});
