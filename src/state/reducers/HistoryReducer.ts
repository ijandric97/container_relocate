import { ActionMap } from '../Reducer';
import { Problem } from './ProblemReducer';

export enum HistoryTypes {
  Push = 'HISTORY_PUSH',
  Pop = 'HISTORY_POP',
  Clear = 'HISTORY_CLEAR'
}

type HistoryPayload = {
  [HistoryTypes.Push]: Problem;
  [HistoryTypes.Pop]: any;
  [HistoryTypes.Clear]: any;
};

export type HistoryActions = ActionMap<HistoryPayload>[keyof ActionMap<HistoryPayload>];

export const historyReducer = (state: Problem[], action: HistoryActions) => {
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
