import { getDatabase, increment, onValue, ref, set } from 'firebase/database';

import store from '../../redux/Store';

import { ProblemState, problemActions } from '../../redux/reducers/ProblemReducer';
import { historyActions } from '../../redux/reducers/HistoryReducer';
import { animatedActions } from '../../redux/reducers/AnimatedReducer';
import { problemsActions } from '../../redux/reducers/ProblemsReducer';

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
  store.dispatch(historyActions.clear());
  store.dispatch(animatedActions.stop());
  store.dispatch(problemActions.update(problem));
};

/** Load the problems from the database */
export const loadProblems = async () => {
  const { problems } = store.getState();

  if (!(Array.isArray(problems) && problems.length)) {
    // Fetch the problems from Firebase
    const db = getDatabase();
    const problemsRef = ref(db, '/problems');

    onValue(
      problemsRef,
      (snapshot) => {
        try {
          const data = snapshot.val();

          // We need to add some data not returned by Firebase
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
          store.dispatch(problemsActions.update(data));
        } catch {
          console.log('Could not load problems from the Firebase!');
        }
      },
      { onlyOnce: true }
    );
  }
};

/** Add new destinations and start the animation */
export const startContainerAnimation = (srcIndex: number, destIndex: number) => {
  store.dispatch(animatedActions.destinations([srcIndex, destIndex]));
  store.dispatch(animatedActions.start());
};

/** Either remove or move the animated container element */
export const endContainerAnimation = () => {
  const { animated, problem } = store.getState();

  // Clean the animation flag
  store.dispatch(animatedActions.stop());

  // Create a "Deep" copy of the current problem
  const newProblem = JSON.parse(JSON.stringify(problem));

  if (animated.destIndex === -1) {
    newProblem.data[animated.srcIndex].shift(); // Remove old
    newProblem.current = problem.current + 1; // Add to counter
  } else {
    store.dispatch(historyActions.push(problem)); // Add old one to history
    const el = newProblem.data[animated.srcIndex].shift(); // Remove old
    newProblem.data[animated.destIndex].unshift(el as number); // Push in new
  }

  store.dispatch(problemActions.update(newProblem));
};

/** Get the framer-motion transition object for extraction scenario */
export const getExtractTransition = () => {
  const { settings } = store.getState();

  return {
    duration: 8 * settings.animation_duration,
    ease: 'easeIn'
  };
};
/** Get the framer-motion transition object for moving scenario */
export const getMoveTransition = () => {
  const { settings } = store.getState();

  return {
    duration: 7 * settings.animation_duration,
    ease: 'easeIn'
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

  store.dispatch(animatedActions.stop());

  if (!solution.isActive) {
    store.dispatch(historyActions.clear());
    store.dispatch(animatedActions.stop());
    store.dispatch(problemActions.reset());
  }

  store.dispatch(problemActions.solution({ ...solution, isActive: !solution.isActive }));
};

export const doSolutionStep = () => {
  const { problem, animated } = store.getState();
  const { solution } = problem;

  if (solution.isActive && !animated.isActive) {
    const newSolution = JSON.parse(JSON.stringify(solution));

    if (solution.current > solution.moves.length) {
      newSolution.isActive = false; //* We need to know when to stop :)
    } else {
      const move = solution.moves[solution.current - 1];
      startContainerAnimation(move[0], move[1]);
      newSolution.current++;
    }

    // Step thru the solution
    store.dispatch(problemActions.solution(newSolution));
  }
};

export const updateSolvedCount = async () => {
  try {
    if (!ProblemFinished) {
      ProblemFinished = true;
      const dbRef = ref(getDatabase());
      set(dbRef, {
        ['/statistic/solved_count']: increment(1)
      });
    }
  } catch {
    console.log('Could not update solved_count.');
  }
};
