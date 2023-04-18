import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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

const animatedSlice = createSlice({
  name: 'animated',
  initialState,
  reducers: {
    start(state) {
      return { ...state, isActive: true };
    },
    stop(state) {
      return { ...state, isActive: false };
    },
    destinations(state, action: PayloadAction<[number, number]>) {
      return { ...state, srcIndex: action.payload[0], destIndex: action.payload[1] };
    }
  }
});

export const { reducer: animatedReducer, actions: animatedActions } = animatedSlice;
