import React, { useEffect } from 'react';
import { useGlobalState } from '../../../state/GlobalState';
import { HistoryTypes } from '../../../state/reducers/HistoryReducer';
import { ProblemTypes, Problem } from '../../../state/reducers/ProblemReducer';

import './HUD.css';

interface GameParam {
  id: string | undefined;
}

const HUD: React.FC<any> = () => {
  const {
    state: { problem, history },
    dispatch // TODO: probably client also and shit
  } = useGlobalState();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const historyUndo = () => {
    if (history.length > 0) {
      // Load the new problem
      dispatch({
        type: ProblemTypes.Update,
        // Some sort of DeepClone, if this doesnt work use Loadash pls
        payload: history[0]
      });
      // Remove it from history
      dispatch({
        type: HistoryTypes.Pop,
        payload: null
      });
    }
  };

  return (
    <div className="HUD">
      <p>Moves: {history.length}</p>
      <button type="button" onClick={historyUndo} disabled={history.length <= 0}>
        ⎌
      </button>
    </div>
  );
};

export default HUD;
