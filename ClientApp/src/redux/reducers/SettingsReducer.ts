import { ActionMap } from '../Store';

let language = 'hr';
if (localStorage.getItem('language')) {
  language = localStorage.getItem('language') as string;
}
let duration = 1;
if (localStorage.getItem('duration')) {
  duration = Number(localStorage.getItem('duration') as String);
}

//? State
export type SettingsState = {
  animation_duration: number;
  grid_height: number;
  grid_width: number;
  language: string;
};
const initialState: SettingsState = {
  animation_duration: duration, //! This is per step
  grid_height: 320,
  grid_width: 350,
  language: language
};

//? Actions
export enum SettingsTypes {
  AnimationDuration = 'SETTINGS_ANIMATION_DURATION',
  GridWidth = 'SETTINGS_GRID_WIDTH',
  GridHeight = 'SETTINGS_GRID_HEIGHT',
  Language = 'SETTINGS_LANGUAGE'
}
type SettingsPayload = {
  [SettingsTypes.AnimationDuration]: number;
  [SettingsTypes.GridWidth]: number;
  [SettingsTypes.GridHeight]: number;
  [SettingsTypes.Language]: 'en' | 'hr';
};
export type SettingsActions = ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

export const settingsReducer = (state: SettingsState = initialState, action: SettingsActions) => {
  switch (action.type) {
    case SettingsTypes.AnimationDuration:
      return { ...state, animation_duration: action.payload };
    case SettingsTypes.GridWidth:
      return { ...state, grid_width: action.payload };
    case SettingsTypes.GridHeight:
      return { ...state, grid_height: action.payload };
    case SettingsTypes.Language:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};
