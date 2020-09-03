import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../redux/Store';
import { strings } from '../../util/language';

import Pic1 from './images/Pic1.png';

import './HomePage.css';

type Statistic = {
  problem_count: number;
  solved_count: number;
};

const HomePage: React.FC = () => {
  // TODO: Perhaps add more info
  const [problems, setProblems] = useState(0);
  const [solved, setSolved] = useState(0);

  const { language } = useSelector((state: GlobalState) => state.settings);

  /** Load the statistic from the database */
  const loadStatistic = async () => {
    try {
      const response = await fetch(window.location.origin + '/api/problem/statistic');
      const data: Statistic = await response.json();

      setProblems(data.problem_count);
      setSolved(data.solved_count);
    } catch (error) {
      console.log(error);
    }
  };

  loadStatistic();

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
