import React from "react";
import { render } from "react-dom";
import { StateProvider } from "./state/GlobalState";

import "normalize.css";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <StateProvider>
    <App />
  </StateProvider>,
  rootElement
);
