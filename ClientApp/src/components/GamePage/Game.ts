import store from '../../redux/Store';

import { AnimatedTypes } from '../../redux/reducers/AnimatedReducer';
import { HistoryTypes } from '../../redux/reducers/HistoryReducer';
import { ProblemState, ProblemTypes } from '../../redux/reducers/ProblemReducer';
import { ProblemsTypes } from '../../redux/reducers/ProblemsReducer';

let ProblemFinished = false;

/** Check if the given problem is completed (empty)
 *
 * @param problem Problem to check
 */
export const isProblemFinished = () => {
  const { problem } = store.getState();

  if (ProblemFinished) return true;

  for (let i = 0; i < problem.data.length; i++) {
    if (problem.data[i].length > 0) {
      return false;
    }
  }

  updateSolvedCount();
  return true;
};

export const getCurrentIndex = () => {
  const { problem } = store.getState();
  const { data, current } = problem;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const el = data[i][j];

      if (el === current) {
        return i;
      }
    }
  }

  return -1;
};

/** Check if the given "problem" object is empty
 *
 * @param obj Problem object to check
 */
export const isProblemEmpty = (obj: ProblemState | Object) => {
  return !obj || Object.keys(obj).length === 0;
};

/** Set the given problem object as current game problem
 *
 * @param problem Problem to dispatch as current problem
 */
export const loadProblem = (problem: ProblemState) => {
  // Clean history, stop animation, load the new problem
  ProblemFinished = false;
  store.dispatch({ type: HistoryTypes.Clear });
  store.dispatch({ type: AnimatedTypes.Stop });
  store.dispatch({ type: ProblemTypes.Update, payload: problem });
};

/** Load the problems from the database */
export const loadProblems = async () => {
  const { problems } = store.getState();

  if (!(Array.isArray(problems) && problems.length)) {
    // Fetch the problems from backend
    try {
      const response = await fetch(window.location.origin + '/api/problem');
      const data = await response.json();

      // We need to add some data not returned by backend
      data.forEach((element: any) => {
        element.finished = false;
        element.current = 1;
        element.original = JSON.parse(JSON.stringify(element.data));
        element.solution = {
          isActive: false,
          current: 1,
          moves: element.solution
        };
      });

      store.dispatch({ type: ProblemsTypes.Update, payload: data });
    } catch (error) {
      console.log(error);
    }
  }
};

/** Add new destinations and start the animation */
export const startContainerAnimation = (srcIndex: number, destIndex: number) => {
  store.dispatch({ type: AnimatedTypes.Destinations, payload: [srcIndex, destIndex] });
  store.dispatch({ type: AnimatedTypes.Start });
};

/** Either remove or move the animated container element */
export const endContainerAnimation = () => {
  const { animated, problem } = store.getState();

  // Clean the animation flag
  store.dispatch({ type: AnimatedTypes.Stop });

  if (animated.destIndex === -1) {
    problem.data[animated.srcIndex].shift(); // Remove old
    problem.current = problem.current + 1; // Add to counter
  } else {
    store.dispatch({ type: HistoryTypes.Push, payload: problem }); // Add old one to history
    const el = problem.data[animated.srcIndex].shift(); // Remove old
    problem.data[animated.destIndex].unshift(el as number); // Push in new
  }

  store.dispatch({ type: ProblemTypes.Update, payload: problem });
};

/** Get the framer-motion transition object for extraction scenario */
export const getExtractTransition = () => {
  const { settings } = store.getState();

  return {
    duration: 8 * settings.animation_duration,
    ease: 'easeIn',
    repeat: Infinity
  };
};
/** Get the framer-motion transition object for moving scenario */
export const getMoveTransition = () => {
  const { settings } = store.getState();

  return {
    duration: 7 * settings.animation_duration,
    ease: 'easeIn',
    repeat: Infinity
  };
};

/** Get the width of the container */
export const getContainerWidth = () => {
  const { settings, problem } = store.getState();

  return (settings.grid_width / problem.col_size) * 0.9;
};

/** Get the width of the space between containers */
export const getContainerSpacer = () => {
  const { settings, problem } = store.getState();

  return (settings.grid_width / problem.col_size) * 0.1;
};

/** Get the height of the container */
export const getContainerHeight = () => {
  const { settings, problem } = store.getState();

  return settings.grid_height / problem.row_size;
};

/** Check if we should extract one of the objects from the top of the stack
 *
 * @param problem Problem object to check
 */
export const nextIsOnTop = ({ data, current }: ProblemState) => {
  const { animated } = store.getState();

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const el = data[i][0]; // Check only the first element

      if (el === current && !animated.isActive) {
        startContainerAnimation(i, -1);
      }

      break; // Break because we only need the first iteration ¯\_(ツ)_/¯
    }
  }
};

export const playSolution = () => {
  const { problem } = store.getState();
  const { solution } = problem;

  store.dispatch({ type: AnimatedTypes.Stop });

  solution.isActive = !solution.isActive;
  if (solution.isActive) {
    store.dispatch({ type: HistoryTypes.Clear });
    store.dispatch({ type: AnimatedTypes.Stop });
    store.dispatch({ type: ProblemTypes.Reset });
  }

  store.dispatch({ type: ProblemTypes.Solution, payload: solution });
};

export const doSolutionStep = () => {
  const { problem, animated } = store.getState();
  const { solution } = problem;

  if (solution.isActive && !animated.isActive) {
    if (solution.current > solution.moves.length) {
      solution.isActive = false; //* We need to know when to stop :)
    } else {
      const move = solution.moves[solution.current - 1];
      startContainerAnimation(move[0], move[1]);
      solution.current++;
    }

    // Step thru the solution
    store.dispatch({ type: ProblemTypes.Solution, payload: solution });
  }
};

export const updateSolvedCount = async () => {
  try {
    if (!ProblemFinished) {
      ProblemFinished = true;
      await fetch(window.location.origin + '/api/problem/statistic', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
