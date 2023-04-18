import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProblemState } from './ProblemReducer';

export type HistoryState = ProblemState[];

const initialState: HistoryState = [];

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    push(state, action: PayloadAction<ProblemState>) {
      try {
        return [JSON.parse(JSON.stringify(action.payload)), ...state];
      } catch (error) {
        console.log(error);
        return state;
      }
    },
    pop(state) {
      return [...state.slice(1)];
    },
    clear() {
      return [];
    }
  }
});

export const { reducer: historyReducer, actions: historyActions } = historySlice;
