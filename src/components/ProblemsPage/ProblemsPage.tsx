import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlobalState } from '../../redux/Store';
import { loadProblems } from '../GamePage/Game';

import Dropdown from './Dropdown/Dropdown';
import ProblemGrid from './ProblemGrid/ProblemGrid';

import './ProblemsPage.css';

const ProblemsPage: React.FC<any> = () => {
  const problems = useSelector((state: GlobalState) => state.problems);

  const [size, setSize] = useState(3);

  // When component is mounted, add the problems into the problems global state
  useEffect(() => {
    loadProblems();
    // eslint-disable-next-line
  }, []);

  const sizeChanged = (size: string) => {
    size === '3x3' ? setSize(3) : setSize(4);
  };

  const value = size === 3 ? '3x3' : '4x4';

  return (
    <motion.div animate={{ opacity: 1 }} transition={{ duration: 1 }} className="problems">
      <div className="selector">
        <label className="label">Size:</label>
        <Dropdown placeholder={'3x3'} value={value} onChange={(v) => sizeChanged(v)} options={['3x3', '4x4']} />
      </div>
      <div className="flex">
        {problems.length > 0 &&
          problems.map((problem, index) => {
            if (problem.row_size === size && problem.col_size === size) {
              return (
                <Link key={index} to={`/game/${index}`}>
                  <div className="item">
                    <ProblemGrid problem={problem} num={index} />
                  </div>
                </Link>
              );
            }
            return null;
          })}
      </div>
    </motion.div>
  );
};

export default ProblemsPage;
