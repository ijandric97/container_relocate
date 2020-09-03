import React, { useEffect, useState, CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryTypes } from '../../../redux/reducers/HistoryReducer';
import { ProblemTypes } from '../../../redux/reducers/ProblemReducer';
import { GlobalState } from '../../../redux/Store';
import { playSolution } from '../Game';
import { strings } from '../../../util/language';

import './HUD.css';

const HUD: React.FC = () => {
  const [popup, setPopup] = useState(false);

  const dispatch = useDispatch();
  const client = useSelector((state: GlobalState) => state.client);
  const animated = useSelector((state: GlobalState) => state.animated);
  const history = useSelector((state: GlobalState) => state.history);
  const problem = useSelector((state: GlobalState) => state.problem);
  const { language } = useSelector((state: GlobalState) => state.settings);

  const { solution } = problem;

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

  const minStyle = {
    color: history.length > solution.moves.length ? 'red' : 'black'
  };

  const popupStyle: CSSProperties = {
    left: `${client.width / 2 - 157}px`,
    top: `${client.height / 2 - 302}px`
  };

  const blockStyle: CSSProperties = {
    width: `${client.width}px`,
    height: `${client.height}px`
  };

  const startSolution = () => {
    setPopup(false);
    playSolution();
  };

  const renderPopup = () => {
    return (
      <div className="blocker" style={blockStyle}>
        <div className="popup" style={popupStyle}>
          <p>{strings[language].gamepage.question[0]}</p>
          <p>{strings[language].gamepage.question[1]}</p>
          <button type="button" onClick={() => startSolution()} className="confirm">
            {strings[language].gamepage.yes}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-check-circle-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              />
            </svg>
          </button>
          <button type="button" onClick={() => setPopup(false)} className="cancel">
            {strings[language].gamepage.no}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-x-circle-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  if (popup) return renderPopup();

  return (
    <>
      <div className="HUD" style={{ left: '10px' }}>
        <p>
          {strings[language].gamepage.moves}: {history.length}
        </p>
        <button
          type="button"
          onClick={historyUndo}
          className="history"
          disabled={history.length <= 0 || animated.isActive}
        >
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
        <p style={minStyle}>
          {strings[language].gamepage.minimum}: {solution.moves.length}
        </p>
        <button type="button" onClick={() => setPopup(!popup)} className="solution" disabled={animated.isActive}>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-play-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default HUD;
