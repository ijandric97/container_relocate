import { historyStore } from '../stores/historyStore';
import { animatedStore } from '../stores/animatedStore';
import { problemStore, type ProblemStore } from '../stores/problemStore';
import { get } from 'svelte/store';
import { settingsStore } from '../stores/settingsStore';
import fBase from './firebase';
import { problemsStore } from '../stores/problemsStore';

let problemFinished = false;

/** Check if the given problem is completed (empty)
 *
 * @param problem Problem to check
 */
export const isProblemFinished = () => {
	const { data } = get(problemStore);

	if (problemFinished) return true;

	for (let i = 0; i < data?.length; i++) {
		if (data[i].length > 0) {
			return false;
		}
	}

	updateSolvedCount();
	return true;
};

export const getCurrentIndex = () => {
	const { data, current } = get(problemStore);

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
export const isProblemEmpty = (obj: ProblemStore | object) => {
	return !obj || Object.keys(obj).length === 0;
};

/** Set the given problem object as current game problem
 *
 * @param problem Problem to dispatch as current problem
 */
export const loadProblem = (problem: ProblemStore) => {
	// Clean history, stop animation, load the new problem
	problemFinished = false;
	historyStore.clear();
	animatedStore.stop();
	problemStore.problem(problem);
};

/** Load the problems from the database */
export const loadProblems = async () => {
	const problems = get(problemsStore);

	if (!(Array.isArray(problems) && problems.length)) {
		// Fetch the problems from Firebase
		fBase.getProblems((data) => problemsStore.problems(data));
	}
};

/** Add new destinations and start the animation */
export const startContainerAnimation = (srcIndex: number, destIndex: number) => {
	animatedStore.destinations([srcIndex, destIndex]);
	animatedStore.start();
};

/** Either remove or move the animated container element */
export const endContainerAnimation = () => {
	// const { animated, problem } = store.getState();
	const problem = get(problemStore);
	const { destIndex, srcIndex } = get(animatedStore);

	// Clean the animation flag
	animatedStore.stop();

	// Create a "Deep" copy of the current problem
	const newProblem = JSON.parse(JSON.stringify(problem));

	if (destIndex === -1) {
		newProblem.data[srcIndex].shift(); // Remove old
		newProblem.current = problem.current + 1; // Add to counter
	} else {
		historyStore.push(problem); // Add old one to history
		const el = newProblem.data[srcIndex].shift(); // Remove old
		newProblem.data[destIndex].unshift(el as number); // Push in new
	}

	problemStore.update(newProblem);
};

/** Get the framer-motion transition object for extraction scenario */
export const getExtractTransition = () => {
	const { animationDuration } = get(settingsStore);

	return {
		duration: 8 * animationDuration,
		ease: 'easeIn'
	};
};
/** Get the framer-motion transition object for moving scenario */
export const getMoveTransition = () => {
	const { animationDuration } = get(settingsStore);

	return {
		duration: 7 * animationDuration,
		ease: 'easeIn'
	};
};

/** Get the width of the container */
export const getContainerWidth = () => {
	const { gridWidth } = get(settingsStore);
	const { col_size } = get(problemStore);

	return (gridWidth / col_size) * 0.9;
};

/** Get the width of the space between containers */
export const getContainerSpacer = () => {
	const { gridWidth } = get(settingsStore);
	const { col_size } = get(problemStore);

	return (gridWidth / col_size) * 0.1;
};

/** Get the height of the container */
export const getContainerHeight = () => {
	const { gridHeight } = get(settingsStore);
	const { row_size } = get(problemStore);

	return gridHeight / row_size;
};

/** Check if we should extract one of the objects from the top of the stack
 *
 * @param problem Problem object to check
 */
export const nextIsOnTop = ({ data, current }: ProblemStore) => {
	const { isActive } = get(animatedStore);

	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			const el = data[i][0]; // Check only the first element

			if (el === current && !isActive) {
				startContainerAnimation(i, -1);
			}

			break; // Break because we only need the first iteration ¯\_(ツ)_/¯
		}
	}
};

export const playSolution = () => {
	const { solution } = get(problemStore);

	animatedStore.stop();

	if (!solution.isActive) {
		historyStore.clear();
		animatedStore.stop();
		problemStore.reset();
	}

	problemStore.solution({ ...solution, isActive: !solution.isActive });
};

export const doSolutionStep = () => {
	const { isActive } = get(animatedStore);
	const { solution } = get(problemStore);

	if (solution.isActive && !isActive) {
		const newSolution = JSON.parse(JSON.stringify(solution));

		if (solution.current > solution.moves.length) {
			newSolution.isActive = false; //* We need to know when to stop :)
		} else {
			const move = solution.moves[solution.current - 1];
			startContainerAnimation(move[0], move[1]);
			newSolution.current++;
		}

		// Step thru the solution
		problemStore.solution(newSolution);
	}
};

export const updateSolvedCount = async () => {
	if (!problemFinished) {
		problemFinished = true;
		fBase.incrementSolvedCount();
	}
};
