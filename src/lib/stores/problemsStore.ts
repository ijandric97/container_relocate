import { writable } from 'svelte/store';
import type { ProblemStore } from './problemStore';

export type ProblemsStore = ProblemStore[];
export const INITIAL_PROBLEMS_STORE: ProblemsStore = [];

export const problemsStore = {
	...writable(INITIAL_PROBLEMS_STORE),
	add: (problem: ProblemStore) => {
		problemsStore.update((prev) => [...prev, problem]);
	},
	problems: (problems: ProblemsStore) => {
		problemsStore.set(problems);
	},
	clear: () => {
		problemsStore.set(INITIAL_PROBLEMS_STORE);
	}
};
