import { ActionMap } from '../Reducer';
import { Problem } from './ProblemReducer';

export type Settings = {
  animation_duration: number;
  grid_height: number;
  grid_width: number;
};

export enum SettingsTypes {
  AnimationDuration = 'SETTINGS_ANIMATION_DURATION',
  GridWidth = 'SETTINGS_GRID_WIDTH',
  GridHeight = 'SETTINGS_GRID_HEIGHT'
}

type SettingsPayload = {
  [SettingsTypes.AnimationDuration]: number;
  [SettingsTypes.GridWidth]: number;
  [SettingsTypes.GridHeight]: number;
};

export type SettingsActions = ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

export const settingsReducer = (state: Settings, action: SettingsActions) => {
  switch (action.type) {
    case SettingsTypes.AnimationDuration:
      return { ...state, animation_duration: action.payload };
    case SettingsTypes.GridWidth:
      return { ...state, grid_width: action.payload };
    case SettingsTypes.GridHeight:
      return { ...state, grid_height: action.payload };
    default:
      return state;
  }
};
