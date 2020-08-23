import { ActionMap } from '../Reducer';
import { Problem } from './ProblemReducer';

export enum AnimatedTypes {
  Push = 'HISTORY_PUSH',
  Pop = 'HISTORY_POP',
  Clear = 'HISTORY_CLEAR'
}

type AnimatedPayload = {
  [AnimatedTypes.Push]: Problem;
  [AnimatedTypes.Pop]: null;
  [AnimatedTypes.Clear]: null;
};

export type AnimatedActions = ActionMap<AnimatedPayload>[keyof ActionMap<AnimatedPayload>];

export const historyReducer = (state: Problem[], action: AnimatedActions) => {
  switch (action.type) {
    case AnimatedTypes.Push:
      state.unshift(JSON.parse(JSON.stringify(action.payload)));
      return state;
    case AnimatedTypes.Pop:
      state.shift();
      return state;
    case AnimatedTypes.Clear:
      return [];
    default:
      return state;
  }
};
