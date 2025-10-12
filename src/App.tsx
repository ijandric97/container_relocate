import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { debounce } from './util/misc';
import { clientActions } from './redux/reducers/ClientReducer';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import ProblemsPage from './components/ProblemsPage/ProblemsPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import GamePage from './components/GamePage/GamePage';
import ErrorPage from './components/ErrorPage/ErrorPage';

import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();

  // On window resize, update the dimensions in global state
  useEffect(() => {
    const handleResize = () => {
      dispatch(
        clientActions.resize({
          height: window.innerHeight,
          width: window.innerWidth
        })
      );
    };

    window.addEventListener('resize', debounce(handleResize, 100));

    return () => window.removeEventListener('resize', debounce(handleResize, 100));
    // We want this to run only on mount and unmount, linter cant detect
    // this use case, so we will disable it :)
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/game/:id?" element={<GamePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
