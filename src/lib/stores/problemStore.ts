import { writable } from 'svelte/store';

export type Solution = {
	isActive: boolean;
	current: number;
	moves: [number, number][]; // Tuple array
};

export type ProblemStore = {
	id: number;
	col_size: number;
	row_size: number;
	current: number;
	data: number[][];
	original: number[][];
	solution: Solution;
};

export const INITIAL_PROBLEM_STORE = {} as ProblemStore;

export const problemStore = {
	...writable(INITIAL_PROBLEM_STORE),
	problem: (problem: ProblemStore) => {
		problemStore.update((prev) => {
			try {
				//! Some sort of DeepClone, if this doesnt work use Lodash pls
				return JSON.parse(JSON.stringify(problem));
			} catch (error) {
				console.error(error);
				return prev;
			}
		});
	},
	reset: () => {
		problemStore.update((prev) => ({
			...prev,
			current: 1,
			data: JSON.parse(JSON.stringify(prev.original))
		}));
	},
	solution: (solution: Solution) => {
		problemStore.update((prev) => ({ ...prev, solution }));
	}
};
