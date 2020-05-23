import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext(undefined);

type StateProviderProps = {
  reducer: any;
  initialState: any | undefined;
  children: React.ReactNode;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  initialState,
  children
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useGlobalState = () => useContext(StateContext);
