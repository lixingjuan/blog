function throttle(fn, delay) {
  let timer;
  let firstTime = true;
  let args = null;

  return function () {
    // 再次触发更新参数
    args = arguments;

    // 如果是第一次则直接执行
    if (firstTime) {
      fn.apply(this, args);
      firstTime = false;
      return;
    }

    // 如果timer为真则说明正在执行还未完成
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
}

const bar = (...val) => setTimeout(console.timeLog, 200, "bar", ...val);

const throttledBar = throttle(bar, 1000);

console.time("bar");
const name = "hello";
throttledBar(1, this.name);
throttledBar(2, this.name);
throttledBar(3, this.name);
throttledBar(4, this.name);
throttledBar(5, this.name);
throttledBar(6, this.name);
throttledBar(7, this.name);
throttledBar(8, this.name);
throttledBar(9, this.name);
setTimeout(throttledBar, 1001, 10);

// ? 期望的执行次数: 3
// ? 期望的输出时间 : 第一次200ms, 第二次200ms + 1000ms = 1.2s, 第三次 2.2s
