import { PayloadAction, createSlice } from '@reduxjs/toolkit';

//? State
export type Solution = {
  isActive: boolean;
  current: number;
  moves: [number, number][]; // Tuple array
};
export type ProblemState = {
  id: number;
  col_size: number;
  row_size: number;
  current: number;
  data: number[][];
  original: number[][];
  solution: Solution;
};
const initialState: ProblemState = {} as ProblemState;

const problemSlice = createSlice({
  name: 'problem',
  initialState,
  reducers: {
    update(state, action: PayloadAction<ProblemState>) {
      try {
        //! Some sort of DeepClone, if this doesnt work use Lodash pls
        return JSON.parse(JSON.stringify(action.payload));
      } catch (error) {
        console.log(error);
        return state;
      }
    },
    reset(state) {
      return { ...state, current: 1, data: JSON.parse(JSON.stringify(state.original)) };
    },
    solution(state, action: PayloadAction<Solution>) {
      return { ...state, solution: action.payload };
    }
  }
});

export const { reducer: problemReducer, actions: problemActions } = problemSlice;
