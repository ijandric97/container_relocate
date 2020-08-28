import { ActionMap } from '../Store';

//? State
export type AnimatedState = {
  isActive: boolean;
  srcIndex: number;
  destIndex: number;
};
const initialState: AnimatedState = {
  isActive: false,
  srcIndex: 0,
  destIndex: 0
};

//? Action
export enum AnimatedTypes {
  Start = 'ANIMATED_START',
  Stop = 'ANIMATED_STOP'
}
type AnimatedPayload = {
  [AnimatedTypes.Start]: any;
  [AnimatedTypes.Stop]: any;
};
export type AnimatedActions = ActionMap<AnimatedPayload>[keyof ActionMap<AnimatedPayload>];

export const animatedReducer = (state: AnimatedState = initialState, action: AnimatedActions) => {
  switch (action.type) {
    case AnimatedTypes.Start:
      return { ...state, isActive: true };
    case AnimatedTypes.Stop:
      return { ...state, isActive: false };
    default:
      return state;
  }
};
