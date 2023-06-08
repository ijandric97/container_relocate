/**
 * Delay execution of the function by the set time
 * @param func Function which you want to delay
 * @param delay How much to delay its start in milliseconds
 */
export const debounce = (func: TimerHandler, delay: number) => {
	let timer: number | undefined;
	return function (event: Event) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(func, delay, event);
	};
};

/**
 * Css breakpoints extracted from Bootstrap
 */
export enum breaks {
	xs = 0,
	sm = 576,
	md = 768,
	lg = 992,
	xl = 1200
}
