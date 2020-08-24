import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useGlobalState } from '../../state/GlobalState';
import { ProblemTypes } from '../../state/reducers/ProblemReducer';
import { HistoryTypes } from '../../state/reducers/HistoryReducer';
import { isEmpty } from '../../util/misc';
import { AnimatedTypes } from '../../state/reducers/AnimatedReducer';

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
    state: { problem, problems, settings },
    dispatch // TODO: probably client also and shit
  } = useGlobalState();

  // Check if problem is currently loaded
  useEffect(() => {
    if (isEmpty(problem) || !isNaN(Number(id))) {
      // Verify the problem then load it into globalstate
      if (isNaN(Number(id)) || Number(id) >= problems.length) {
        routerHistory.push('/problems');
        return; // ! Apparently routerHistory.push doesnt end this effect :) so we have to return
      }

      try {
        dispatch({
          type: HistoryTypes.Clear, // Clean the fucking history
          payload: null
        });
        dispatch({
          type: AnimatedTypes.Clear, // Clean the animation flag
          payload: null
        });
        dispatch({
          type: ProblemTypes.Update, // Load the new problem
          payload: problems[Number(id)]
        });
      } catch (error) {
        routerHistory.push('/problems');
      }
    }
    // eslint-disable-next-line
  }, []);

  if (isEmpty(problem)) return null; //* Problem has not loaded yet, return

  // TODO: Add check to see if all the shit inside data is empty, and then throw the you win element?
  console.log(problem);

  return (
    <div className="game">
      <HUD />
      <ContainerGrid height={settings.grid_height} width={settings.grid_width} />
      <Ground />
    </div>
  );
};

export default GamePage;
