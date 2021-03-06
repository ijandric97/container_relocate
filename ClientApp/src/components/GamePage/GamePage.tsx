import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../redux/Store';
import { isProblemFinished, isProblemEmpty, loadProblem } from './Game';

import ContainerGrid from './ContainerGrid/ContainerGrid';
import Ground from './Ground/Ground';
import HUD from './HUD/HUD';
import Truck from './Truck/Truck';
import VictoryPopup from './VictoryPopup/VictoryPopup';
import Crane from './Crane/Crane';

import './GamePage.css';

interface GameParam {
  id: string | undefined;
}

const GamePage: React.FC = () => {
  const { id } = useParams<GameParam>();
  let routerHistory = useHistory();

  const problem = useSelector((state: GlobalState) => state.problem);
  const problems = useSelector((state: GlobalState) => state.problems);

  // Check if problem is currently loaded
  useEffect(() => {
    if (isProblemEmpty(problem) || !isNaN(Number(id))) {
      // Verify the problem then load it into globalstate
      if (isNaN(Number(id)) || Number(id) >= problems.length) {
        routerHistory.push('/problems');
        return; // ! Apparently routerHistory.push doesnt end this effect :) so we have to return
      }

      try {
        loadProblem(problems[Number(id)]);
      } catch (error) {
        routerHistory.push('/problems');
      }
    }
    // eslint-disable-next-line
  }, []);

  if (isProblemEmpty(problem)) return null; //* Problem has not loaded yet, return
  if (isProblemFinished()) {
    return (
      <div className="game">
        <VictoryPopup />
        <Ground />
      </div>
    );
  }

  return (
    <div className="game">
      <HUD />
      <ContainerGrid />
      <Crane />
      <Ground />
      <Truck />
    </div>
  );
};

export default GamePage;
