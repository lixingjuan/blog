/** 防抖 */
const debounce = (fn, delay) => {
  let timer = null;
  let isFirstTime = true;

  return (...args) => {
    // 1. 首次调用直接执行
    if (isFirstTime) {
      fn(...args);
      isFirstTime = false;
      return;
    }

    // 2. 若上次的timer还没执行，则重置计时器
    timer && clearInterval(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
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
