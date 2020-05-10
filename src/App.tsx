import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import ProblemsPage from "./pages/ProblemsPage/ProblemsPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import GamePage from "./pages/GamePage/GamePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const App = () => {
  const conRef = React.useRef(null);

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
