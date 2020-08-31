import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './HUD.css';
import { HistoryTypes } from '../../../redux/reducers/HistoryReducer';
import { ProblemTypes } from '../../../redux/reducers/ProblemReducer';
import { GlobalState } from '../../../redux/Store';

const HUD: React.FC = () => {
  const dispatch = useDispatch();
  const animated = useSelector((state: GlobalState) => state.animated);
  const history = useSelector((state: GlobalState) => state.history);
  const { solution } = useSelector((state: GlobalState) => state.problem);

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const historyUndo = () => {
    if (animated.isActive) return; //* Disabled when animating :)

    if (history.length > 0) {
      // Load the old problem and remove it from history
      dispatch({ type: ProblemTypes.Update, payload: history[0] });
      dispatch({ type: HistoryTypes.Pop, payload: null });
    }
  };

  //TODO: perhaps this should be in Game.ts
  // TODO: Add solution to state
  // place it in gamepage i guess?
  const playSolution = () => {
    return null;
  };

  const minStyle = {
    color: history.length > solution.moves.length ? 'red' : 'black'
  };

  return (
    <>
      <div className="HUD" style={{ left: '10px' }}>
        <p>Moves: {history.length}</p>
        <button type="button" onClick={historyUndo} className="history" disabled={history.length <= 0}>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-arrow-counterclockwise"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.83 6.706a5 5 0 0 0-7.103-3.16.5.5 0 1 1-.454-.892A6 6 0 1 1 2.545 5.5a.5.5 0 1 1 .91.417 5 5 0 1 0 9.375.789z"
            />
            <path
              fillRule="evenodd"
              d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"
            />
          </svg>
        </button>
      </div>
      <div className="HUD" style={{ right: '10px' }}>
        <p style={minStyle}>Minimum: {solution.moves.length}</p>
        <button type="button" className="solution" onClick={playSolution}>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-trophy"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z" />
            <path
              fillRule="evenodd"
              d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
            />
            <path d="M7 10h2v4H7v-4z" />
            <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default HUD;
