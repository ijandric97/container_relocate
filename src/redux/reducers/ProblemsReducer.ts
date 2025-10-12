import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProblemState } from './ProblemReducer';

//? State
export type ProblemsState = ProblemState[];
const initialState: ProblemsState = [];

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    add(state, action: PayloadAction<ProblemState>) {
      return [...state, action.payload];
    },
    update(_state, action: PayloadAction<ProblemsState>) {
      return action.payload;
    },
    clear() {
      return initialState;
    }
  }
});

export const { reducer: problemsReducer, actions: problemsActions } = problemsSlice;
