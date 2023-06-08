import { writable } from 'svelte/store';
import type { ProblemStore } from './problemStore';

export type HistoryStore = ProblemStore[];

export const INITIAL_HISTORY_STORE: HistoryStore = [];

export const historyStore = {
	...writable(INITIAL_HISTORY_STORE),
	push: (problem: ProblemStore) => {
		historyStore.update((prev) => {
			try {
				return [JSON.parse(JSON.stringify(problem)), ...prev];
			} catch (error) {
				console.error(error);
				return prev;
			}
		});
	},
	pop: () => {
		historyStore.update((prev) => [...prev.slice(1)]);
	},
	clear: () => {
		historyStore.set(INITIAL_HISTORY_STORE);
	}
};
