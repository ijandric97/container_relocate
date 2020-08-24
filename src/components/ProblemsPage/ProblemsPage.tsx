import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGlobalState } from '../../state/GlobalState';
import { ProblemsTypes } from '../../state/reducers/ProblemsReducer';
import { dummy_problems } from '../../util/dummydata'; //TODO: Remove once asp.net is done

import Dropdown from './Dropdown/Dropdown';
import ProblemGrid from './ProblemGrid/ProblemGrid';

import './ProblemsPage.css';

// TODO: Make this work with actual data

const ProblemsPage: React.FC<any> = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  const {
    state: { problems },
    dispatch
  } = useGlobalState();

  // When component is mounted, add the problems into the problems global state
  useEffect(() => {
    // TODO: Axios that will load into the problems list
    dispatch({
      type: ProblemsTypes.Update,
      payload: dummy_problems
    });
    // eslint-disable-next-line
  }, []);

  return (
    <motion.div animate={{ opacity: 1 }} transition={{ duration: 1 }} className="problems">
      <div className="selector">
        <label className="label">Rows:</label>
        <Dropdown placeholder={3} value={rows} onChange={(v) => setRows(v)} options={[3, 4, 5]} />
        <label className="label">Columns:</label>
        <Dropdown placeholder={3} value={cols} onChange={(v) => setCols(v)} options={[3, 4, 5]} />
      </div>
      <div className="flex">
        {problems.length > 0 &&
          problems.map((problem, index) => {
            if (problem.row_size === rows && problem.col_size === cols) {
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
