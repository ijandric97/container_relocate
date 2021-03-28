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
  Stop = 'ANIMATED_STOP',
  Destinations = 'ANIMATED_DESTINATIONS'
}
type AnimatedPayload = {
  [AnimatedTypes.Start]: any;
  [AnimatedTypes.Stop]: any;
  [AnimatedTypes.Destinations]: [number, number];
};
export type AnimatedActions = ActionMap<AnimatedPayload>[keyof ActionMap<AnimatedPayload>];

export const animatedReducer = (state: AnimatedState = initialState, action: AnimatedActions) => {
  switch (action.type) {
    case AnimatedTypes.Start:
      return { ...state, isActive: true };
    case AnimatedTypes.Stop:
      return { ...state, isActive: false };
    case AnimatedTypes.Destinations:
      return { ...state, srcIndex: action.payload[0], destIndex: action.payload[1] };
    default:
      return state;
  }
};
