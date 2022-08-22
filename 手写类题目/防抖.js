/** 防抖 */
const dobounce = function (fn, time) {
  let timer = null;
  let isFistTime = true;

  return function () {
    if (isFistTime) {
      fn();
      isFistTime = false;
      return;
    }

    timer && clearTimeout(timer);
    timer = setTimeout(fn, time);
  };
};
