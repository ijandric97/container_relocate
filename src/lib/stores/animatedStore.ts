import { writable } from 'svelte/store';

export type AnimatedStore = {
	isActive: boolean;
	srcIndex: number;
	destIndex: number;
};

export const INITIAL_ANIMATED_STORE: AnimatedStore = {
	isActive: false,
	srcIndex: 0,
	destIndex: 0
};

export const animatedStore = {
	...writable(INITIAL_ANIMATED_STORE),
	start: () => {
		animatedStore.update((prev) => ({ ...prev, isActive: true }));
	},
	stop: () => {
		animatedStore.update((prev) => ({ ...prev, isActive: false }));
	},
	destinations: ([srcIndex, destIndex]: [number, number]) => {
		animatedStore.update((prev) => ({ ...prev, srcIndex, destIndex }));
	}
};
