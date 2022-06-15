/**
 * 1. 什么是闭包？
 * 2. 闭包应用场景？
 *  1. 防抖/节流
 *  2. 缓存计算结果
 *  3. 函数柯里化，记录一部分值
 * 3. 闭包有什么缺点？
 *  1. 循环引用会导致内存泄漏
 *
 */

/** 防抖 */
const dobounce = function (fn, time) {
  let timer = null;
  let firstTime = true;
  return function (...args) {
    if (firstTime) {
      fn(...args);
      firstTime = false;
      return;
    }

    timer && clearTimeout(timer);
    timer = setTimeout(fn, time, ...args);
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

function throttle(func, delay) {
  let timer;
  let firstTime = true;
  let args = null;
  let context = null;

  return function () {
    context = this;
    args = arguments;

    // 如果是第一次则直接执行
    if (firstTime) {
      func.apply(this, args);
      firstTime = false;
      return;
    }

    // 如果timer为真则说明正在执行还未完成
    if (timer) {
      return;
    }

    timer = setTimeout(function () {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
}

const bar = (val) => setTimeout(console.timeLog, 200, "bar", val);

const throttledBar = throttle(bar, 1000);

console.time("bar");
throttledBar(1);
throttledBar(2);
throttledBar(3);
throttledBar(4);
throttledBar(5);
throttledBar(6);
throttledBar(7);
throttledBar(8);
throttledBar(9);
setTimeout(throttledBar, 1001, 10);

// ? 期望的执行次数: 3
// ? 期望的输出时间 : 第一次200ms, 第二次200ms + 1000ms = 1.2s, 第三次 2.2s

/** 缓存计算结果: 见：3.1.3-闭包应用-缓存计算结果 */

/** 函数柯里化: 见：3.2.4-闭包应用-函数柯里化-currying */
