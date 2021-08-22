/* 节流，定时执行一次 */
function throttle(fn, interval) {
  let last = 0;
  return function () {
    let now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, arguments);
    }
  };
}

function handle() {
  console.log(Math.random());
}

const throttleHandle = throttle(handle, 1000);

throttleHandle();
throttleHandle();
throttleHandle();
throttleHandle();
throttleHandle();
throttleHandle();
throttleHandle();
