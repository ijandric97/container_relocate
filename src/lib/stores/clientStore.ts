import { writable } from 'svelte/store';

export type ClientStore = {
	height: number;
	width: number;
};

export const INITIAL_CLIENT_STORE: ClientStore = { height: 0, width: 0 };

export const clientStore = writable(INITIAL_CLIENT_STORE);
