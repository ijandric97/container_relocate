export const debounce = (func: TimerHandler, delay: number) => {
  let timer: number | undefined;
  return function (event: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, delay, event);
  };
};

export enum breaks {
  xs = 0,
  sm = 576,
  md = 768,
  lg = 992,
  xl = 1200
}

/** Check if object is empty.
 *
 * @param obj Object to check
 */
export const isEmpty = (obj: object) => {
  return !obj || Object.keys(obj).length === 0;
};
