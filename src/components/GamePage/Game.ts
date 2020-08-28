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
export const isGameFinished = (problem: ProblemState) => {
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
  const problems = store.getState().problems;

  if (!(Array.isArray(problems) && problems.length)) {
    // TODO: Axios that will load into the problems list
    store.dispatch({ type: ProblemsTypes.Update, payload: dummy_problems });
  }
};

/** Check if we should extract one of the objects from the top of the stack
 *
 * @param problem Problem object to check
 */
export const nextIsOnTop = ({ data, current }: ProblemState) => {
  const animated = store.getState().animated;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const el = data[i][0]; // Check only the first element

      if (el === current && !animated.isActive) {
        store.dispatch({ type: AnimatedTypes.Destinations, payload: [i, -1] });
        store.dispatch({ type: AnimatedTypes.Start, payload: null });
      }

      break; // Break because we only need the first iteration ¯\_(ツ)_/¯
    }
  }
};

// TODO: call that will get me all the calculations?
