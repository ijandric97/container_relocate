import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useGlobalState } from '../../state/GlobalState';
import { ProblemTypes } from '../../state/reducers/ProblemReducer';
import { HistoryTypes } from '../../state/reducers/HistoryReducer';
import { isEmpty } from '../../util/misc';

import ContainerGrid from './ContainerGrid/ContainerGrid';
import Ground from './Ground/Ground';
import HUD from './HUD/HUD';

import './GamePage.css';

interface GameParam {
  id: string | undefined;
}

const GamePage: React.FC<any> = () => {
  const { id } = useParams<GameParam>();
  let routerHistory = useHistory();
  const {
    state: { problem, problems, history },
    dispatch // TODO: probably client also and shit
  } = useGlobalState();

  // Check if problem is currently loaded
  useEffect(() => {
    if (isEmpty(problem) || !isNaN(Number(id))) {
      console.log('NO');
      console.log(!isNaN(Number(id)));

      // Verify the problem then load it into globalstate
      if (isNaN(Number(id)) || Number(id) >= problems.length) {
        routerHistory.push('/problems');
      }

      console.log('HIT');

      try {
        // Clean the fucking history
        dispatch({
          type: HistoryTypes.Clear,
          payload: null
        });
        // Load the new problem
        console.log('OU');
        console.log(problems.length);
        console.log(Number(id));
        dispatch({
          type: ProblemTypes.Update,
          payload: JSON.parse(JSON.stringify(problems[Number(id)])) // Some sort of DeepClone, if this doesnt work use Loadash pls
        });
      } catch (error) {
        routerHistory.push('/problems');
      }
    }
    // eslint-disable-next-line
  }, []);

  if (isEmpty(problem)) return null; // Problem has not loaded yet, return

  //console.log(problem);

  // TODO: Add check to see if all the shit inside data is empty, and then throw the you win element?

  return (
    <div className="game">
      <HUD />
      <ContainerGrid height={500} width={330} />
      <Ground />
    </div>
  );
};

export default GamePage;
