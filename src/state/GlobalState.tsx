import React, { createContext, useContext, useReducer, Dispatch } from 'react';

import { State, initialState } from './State';
import { mainReducer, Actions } from './Reducer';

const StateContext = createContext<{
  state: State;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

export const useGlobalState = () => useContext(StateContext);
