/** 防抖 */
const debounce = (fn, wait = 300) => {
  let timer = null;
  let isFirstTime = true;

  return (...args) => {
    if (isFirstTime) {
      fn.apply(null, args);
      isFirstTime = false;
      return;
    }

    timer && clearTimeout(timer);
    timer = setTimeout(fn, wait, ...args);
  };
};