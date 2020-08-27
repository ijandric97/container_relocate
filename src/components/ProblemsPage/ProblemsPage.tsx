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
  const [size, setSize] = useState(3);

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

  const sizeChanged = (size: string) => {
    size === '3x3' ? setSize(3) : setSize(4);
  };

  return (
    <motion.div animate={{ opacity: 1 }} transition={{ duration: 1 }} className="problems">
      <div className="selector">
        <label className="label">Size:</label>
        <Dropdown placeholder={'3x3'} value={'3x3'} onChange={(v) => sizeChanged(v)} options={['3x3', '4x4']} />
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
