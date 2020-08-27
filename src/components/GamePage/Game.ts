import { Problem } from '../../state/reducers/ProblemReducer';

export default null;

export const isGameFinished = (problem: Problem) => {
  for (let i = 0; i < problem.data.length; i++) {
    if (problem.data[i].length > 0) {
      return false;
    }
  }
  return true;
};

export const isProblemEmpty = (obj: object) => {
  return !obj || Object.keys(obj).length === 0;
};

// TODO: call that will get me all the calculations?
