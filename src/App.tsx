import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { debounce } from './util/misc';
import { ClientTypes } from './redux/reducers/ClientReducer';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import ProblemsPage from './components/ProblemsPage/ProblemsPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import GamePage from './components/GamePage/GamePage';
import ErrorPage from './components/ErrorPage/ErrorPage';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  // On window resize, update the dimensions in global state
  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: ClientTypes.Resize,
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
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <div className="App">
        <Route component={Navbar} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/problems" component={ProblemsPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/game/:id?" component={GamePage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
