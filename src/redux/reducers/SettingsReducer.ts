import { PayloadAction, createSlice } from '@reduxjs/toolkit';

let language = 'hr';
if (localStorage.getItem('language')) {
  language = localStorage.getItem('language') as string;
}
let duration = 1;
if (localStorage.getItem('duration')) {
  duration = Number(localStorage.getItem('duration') as String);
}

export type TLanguageCode = 'en' | 'hr' | 'de';

//? State
export type SettingsState = {
  animation_duration: number;
  grid_height: number;
  grid_width: number;
  language: TLanguageCode;
};
const initialState: SettingsState = {
  animation_duration: duration, //! This is per step
  grid_height: 320,
  grid_width: 350,
  language: language as TLanguageCode
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    animationDuration(state, action: PayloadAction<number>) {
      return { ...state, animation_duration: action.payload };
    },
    gridWidth(state, action: PayloadAction<number>) {
      return { ...state, grid_width: action.payload };
    },
    gridHeight(state, action: PayloadAction<number>) {
      return { ...state, grid_height: action.payload };
    },
    language(state, action: PayloadAction<TLanguageCode>) {
      return { ...state, language: action.payload };
    }
  }
});

export const { reducer: settingsReducer, actions: settingsActions } = settingsSlice;
