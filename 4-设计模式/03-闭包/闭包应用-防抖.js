/** 防抖 */
const dobounce = function (fn, delay) {
  let timer = null;
  let firstTime = true;

  return function (...args) {
    if (firstTime) {
      fn(...args);
      firstTime = false;
      return;
    }

    timer && clearTimeout(timer);
    timer = setTimeout(fn, delay, ...args);
  };
};

const foo = (val) => setTimeout(console.timeLog, 200, "foo", val);

const dobouncedFoo = dobounce(foo, 1000);

console.time("foo");
dobouncedFoo(1);
dobouncedFoo(2);
dobouncedFoo(3);
dobouncedFoo(4);
dobouncedFoo(5);
dobouncedFoo(6);
dobouncedFoo(7);

// ? 期望的输出次数: 2(首次执行，最后执行一次)
// ? 期望的输出时间:
// 1. 第一次200ms
// 2. 第二次200ms + 1000ms = 1.2s
