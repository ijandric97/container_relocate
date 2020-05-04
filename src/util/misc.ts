export const debounce = (func: TimerHandler, delay: number) => {
  let timer: number | undefined;
  return function(event: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, delay, event);
  };
};
