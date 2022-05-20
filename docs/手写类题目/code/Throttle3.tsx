import React from "react";

const domId = "demo3";

/** Here */
const throttle = (fn, wait = 300) => {
  let timer = null;
  let lastTime = 0;

  return (args) => {
    const now = +new Date();
    // 下次触发fn的剩余时间
    const remaining = wait - (now - lastTime);

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn(args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = +new Date();
        timer = null;
        fn(args);
      }, remaining);
    }
  };
};

function foo() {
  const number = Number(document.getElementById(domId).innerText);
  document.getElementById(domId).innerHTML = `${number + 1}`;
}

const throttledFn = throttle(foo, 6000);

const Demo = () => {
  return (
    <>
      <div>在⬇️移动鼠标</div>
      <div
        id={domId}
        style={{
          height: "100px",
          width: "100%",
          background: "orange",
        }}
        onMouseMove={throttledFn}
      >
        0
      </div>
    </>
  );
};

export default Demo;
