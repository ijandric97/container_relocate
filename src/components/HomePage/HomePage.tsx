import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../redux/Store';
import { strings } from '../../util/language';

import Pic1 from './images/Pic1.png';

import './HomePage.css';
import { getDatabase, onValue, ref } from 'firebase/database';

const HomePage: React.FC = () => {
  const [problems, setProblems] = useState(0);
  const [solved, setSolved] = useState(0);

  const { language } = useSelector((state: GlobalState) => state.settings);

  /** Load the statistic from the database */
  const loadStatistic = async () => {
    const db = getDatabase();
    const statisticRef = ref(db, '/statistic');

    onValue(
      statisticRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          setProblems(data.problem_count);
          setSolved(data.solved_count);
        } catch {
          console.log('Could not load statistics from Firestore!');
        }
      },
      { onlyOnce: true }
    );
  };

  // Only load the statistic on the initial render, otherwise we read data form firebase twice!!
  useEffect(() => {
    loadStatistic();
    // We want this to run only on mount and unmount, linter cant detect
    // this use case, so we will disable it :)
    // eslint-disable-next-line
  }, []);

  return (
    <motion.div animate={{ opacity: 1 }} transition={{ duration: 1 }} className="home">
      <h1 className="title">{strings[language].homepage.title}</h1>
      <div>
        <div className="flex">
          <img src={Pic1} alt="Game example" />
          <div className="content">
            <h2>{strings[language].homepage.what[0]}</h2>
            <p>{strings[language].homepage.what[1]}</p>
            <p>
              {strings[language].homepage.what[2]}
              <b>{problems}</b>
              {strings[language].homepage.what[3]}
              <b>{solved}</b>
              {strings[language].homepage.what[4]}
            </p>
            <p>{strings[language].homepage.what[5]}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
