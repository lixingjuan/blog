/** 防抖 */
const debounce = function (fn, delay) {
  let timer = null;
  let firstTime = true;

  return function (...args) {
    // 1. 首次直接执行
    if (firstTime) {
      fn(...args);
      firstTime = false;
      return;
    }

    // 2. timer为真清楚
    timer && clearTimeout(timer);
    // 3. 重新赋值timer, 重置定时器
    timer = setTimeout(fn, delay, ...args);
  };
};




const foo = (val) => setTimeout(console.timeLog, 200, "foo", val);

const debouncedFoo = debounce(foo, 1000);

console.time("foo");
debouncedFoo(1);
debouncedFoo(2);
debouncedFoo(3);
debouncedFoo(4);
debouncedFoo(5);
debouncedFoo(6);
debouncedFoo(7);

// ? 期望的输出次数: 2(首次执行，最后执行一次)
// ? 期望的输出时间:
// 1. 第一次200ms
// 2. 第二次200ms + 1000ms = 1.2s
