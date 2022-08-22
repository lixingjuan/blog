/** 节流 */
const throttle = function (fn, time) {
  let timer = null; // 定时器
  let isFirstTime = true; // 第一次执行

  return function (...args) {
    // 首次立即执行
    if (isFirstTime) {
      fn.apply(null, args);
      return (isFirstTime = false);
    }

    // 说明上次还未执行完成
    if (timer) {
      return;
    }

    // 延迟一段时间执行
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(null, args);
    }, time);
  };
};