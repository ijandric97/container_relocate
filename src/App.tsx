import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useGlobalState } from "./state/GlobalState";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import ProblemsPage from "./pages/ProblemsPage/ProblemsPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import GamePage from "./pages/GamePage/GamePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import { debounce } from "./util/misc";

const App = () => {
  const [{ client }, dispatch] = useGlobalState();

  useEffect(() => {
    const handleResize = () => {
      console.log("resizing");
      dispatch({
        type: "WINDOW_RESIZE",
        value: {
          ...client,
          height: window.innerHeight,
          width: window.innerWidth
        }
      });
    };

    window.addEventListener("resize", debounce(handleResize, 100));

    return () =>
      window.removeEventListener("resize", debounce(handleResize, 100));
  }, []);

  return (
    <Router>
      <div className="App">
        <Route component={Navbar} />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/problems" component={ProblemsPage} />
          <Route path="/statistics" component={StatisticsPage} />
          <Route path="/game" component={GamePage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
