import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ClientState = {
  height: number;
  width: number;
};

const initialState: ClientState = {
  height: window.innerHeight,
  width: window.innerWidth
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    resize(state, action: PayloadAction<ClientState>) {
      return {
        ...state,
        height: action.payload.height,
        width: action.payload.width
      };
    }
  }
});

export const { reducer: clientReducer, actions: clientActions } = clientSlice;
