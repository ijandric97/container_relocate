import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useGlobalState } from './state/GlobalState';
import { ClientTypes } from './state/reducers/ClientReducer';
import { debounce } from './util/misc';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import ProblemsPage from './components/ProblemsPage/ProblemsPage';
import StatisticsPage from './components/StatisticsPage/StatisticsPage';
import GamePage from './components/GamePage/GamePage';
import ErrorPage from './components/ErrorPage/ErrorPage';

import './App.css';

const App = () => {
  const { dispatch } = useGlobalState();

  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: ClientTypes.Update,
        payload: {
          height: window.innerHeight,
          width: window.innerWidth
        }
      });
    };

    window.addEventListener('resize', debounce(handleResize, 100));

    return () => window.removeEventListener('resize', debounce(handleResize, 100));
    //! We want this to run only on mount and unmount, linter cant detect
    //! this use case, so we will disable it :)
    //! eslint-disable-next-line
  }, []);

  // TODO: Statistics page to settings page
  return (
    <Router>
      <div className="App">
        <Route component={Navbar} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/problems" component={ProblemsPage} />
          <Route path="/statistics" component={StatisticsPage} />
          <Route path="/game/:id?" component={GamePage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
