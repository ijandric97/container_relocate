import store from '../../redux/Store';

import { AnimatedTypes } from '../../redux/reducers/AnimatedReducer';
import { HistoryTypes } from '../../redux/reducers/HistoryReducer';
import { ProblemState, ProblemTypes } from '../../redux/reducers/ProblemReducer';
import { ProblemsTypes } from '../../redux/reducers/ProblemsReducer';

import { dummy_problems } from '../../util/dummydata';

/** Check if the given problem is completed (empty)
 *
 * @param problem Problem to check
 */
export const isProblemFinished = (problem: ProblemState) => {
  for (let i = 0; i < problem.data.length; i++) {
    if (problem.data[i].length > 0) {
      return false;
    }
  }
  return true;
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
  store.dispatch({ type: HistoryTypes.Clear, payload: null });
  store.dispatch({ type: AnimatedTypes.Stop, payload: null });
  store.dispatch({ type: ProblemTypes.Update, payload: problem });
};

/** Load the problems from the database */
export const loadProblems = () => {
  const { problems } = store.getState();

  if (!(Array.isArray(problems) && problems.length)) {
    // TODO: Axios that will load into the problems list
    store.dispatch({ type: ProblemsTypes.Update, payload: dummy_problems });
  }
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

/** Add new destinations and start the animation */
export const startContainerAnimation = (srcIndex: number, destIndex: number) => {
  store.dispatch({ type: AnimatedTypes.Destinations, payload: [srcIndex, destIndex] });
  store.dispatch({ type: AnimatedTypes.Start });
};

/** Get the framer-motion transition object for extraction scenario */
export const getExtractTransition = () => {
  const { settings } = store.getState();

  return {
    duration: 7 * settings.animation_duration,
    ease: 'easeIn',
    repeat: Infinity
  };
};
/** Get the framer-motion transition object for moving scenario */
export const getMoveTransition = () => {
  const { settings } = store.getState();

  return {
    duration: 6 * settings.animation_duration,
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

    store.dispatch({ type: ProblemTypes.Update, payload: problem });
  }
};
