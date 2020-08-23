import { ActionMap } from '../Reducer';
import { Problem } from './ProblemReducer';

export enum AnimatedTypes {
  Set = 'ANIMATED_SET',
  Clear = 'ANIMATED_CLEAR'
}

type AnimatedPayload = {
  [AnimatedTypes.Set]: boolean;
  [AnimatedTypes.Clear]: any;
};

export type AnimatedActions = ActionMap<AnimatedPayload>[keyof ActionMap<AnimatedPayload>];

export const animatedReducer = (state: boolean, action: AnimatedActions) => {
  switch (action.type) {
    case AnimatedTypes.Set:
      return true;
    case AnimatedTypes.Clear:
      return false;
    default:
      return state;
  }
};
