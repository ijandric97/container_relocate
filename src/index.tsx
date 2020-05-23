import React from "react";
import { render } from "react-dom";
import "normalize.css";

import { StateProvider } from "./state/GlobalState";
import { initialState } from "./state/State";
import { reducer } from "./state/Reducer";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  rootElement
);
