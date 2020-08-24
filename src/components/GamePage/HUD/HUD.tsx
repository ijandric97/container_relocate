import React, { useEffect } from 'react';
import { useGlobalState } from '../../../state/GlobalState';
import { HistoryTypes } from '../../../state/reducers/HistoryReducer';
import { ProblemTypes } from '../../../state/reducers/ProblemReducer';

import './HUD.css';

interface GameParam {
  id: string | undefined;
}

const HUD: React.FC<any> = () => {
  const {
    state: { animated, history },
    dispatch // TODO: probably client also and shit
  } = useGlobalState();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const historyUndo = () => {
    if (animated) return; //* Disabled when animating :)

    if (history.length > 0) {
      dispatch({
        type: ProblemTypes.Update, // Load the old problem
        payload: history[0]
      });
      dispatch({
        type: HistoryTypes.Pop, // Remove it from history
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
