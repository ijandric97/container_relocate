import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useGlobalState } from '../../state/GlobalState';
import { ProblemTypes } from '../../state/reducers/ProblemReducer';
import { isEmpty } from '../../util/misc';

import ContainerGrid from './ContainerGrid/ContainerGrid';
import Ground from './Ground/Ground';

import './GamePage.css';

interface GameParam {
  id: string | undefined;
}

const GamePage: React.FC<any> = () => {
  const { id } = useParams<GameParam>();
  let history = useHistory();
  const {
    state: { problem, problems },
    dispatch // TODO: probably client also and shit
  } = useGlobalState();

  // Check if problem is currently loaded
  useEffect(() => {
    if (isEmpty(problem) || (id !== undefined && Number(id) < problems.length)) {
      // Verify the problem then load it into globalstate
      if (id === undefined || Number(id) >= problems.length) {
        history.push('/problems');
      }

      try {
        dispatch({
          type: ProblemTypes.Update,
          // Some sort of DeepClone, if this doesnt work use Loadash pls
          payload: JSON.parse(JSON.stringify(problems[Number(id)]))
        });
      } catch (error) {
        history.push('/problems');
      }
    } else {
      history.push('/problems');
    }
    // eslint-disable-next-line
  }, []);

  if (isEmpty(problem)) return null; // Problem has not loaded yet, return

  console.log(problem.data);

  return (
    <div className="game">
      <ContainerGrid height={500} width={330} />
      <Ground />
    </div>
  );
};

export default GamePage;
