import { ActionMap } from '../Store';
import { ProblemState } from './ProblemReducer';

//? State
export type HistoryState = ProblemState[];
const initialState: HistoryState = [];

//? HistoryTypes
export enum HistoryTypes {
  Push = 'HISTORY_PUSH',
  Pop = 'HISTORY_POP',
  Clear = 'HISTORY_CLEAR'
}
type HistoryPayload = {
  [HistoryTypes.Push]: ProblemState;
  [HistoryTypes.Pop]: any;
  [HistoryTypes.Clear]: any;
};
export type HistoryActions = ActionMap<HistoryPayload>[keyof ActionMap<HistoryPayload>];

export const historyReducer = (state: ProblemState[] = initialState, action: HistoryActions) => {
  switch (action.type) {
    case HistoryTypes.Push:
      try {
        state.unshift(JSON.parse(JSON.stringify(action.payload)));
      } catch (error) {
        console.log(error);
      }
      return state;
    case HistoryTypes.Pop:
      state.shift();
      return state;
    case HistoryTypes.Clear:
      return [];
    default:
      return state;
  }
};
