import { writable } from 'svelte/store';

export type TLanguageCode = 'en' | 'hr' | 'de';

export type SettingsStore = {
	animationDuration: number;
	gridHeight: number;
	gridWidth: number;
	language: TLanguageCode;
};

export const INITIAL_SETTINGS_STORE: SettingsStore = {
	animationDuration: 1, //! This is per step
	gridHeight: 320,
	gridWidth: 350,
	language: 'hr'
};

export const settingsStore = {
	...writable(INITIAL_SETTINGS_STORE),
	loadFromStorage: () => {
		let language: TLanguageCode = 'hr';
		if (localStorage && localStorage.getItem('language')) {
			language = localStorage.getItem('language') as TLanguageCode;
		}
		let animationDuration = 1;
		if (localStorage && localStorage.getItem('duration')) {
			animationDuration = Number(localStorage.getItem('duration') as string);
		}

		settingsStore.update((prev) => ({ ...prev, language, animationDuration }));
	}
};
