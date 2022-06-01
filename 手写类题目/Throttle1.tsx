import React, { useRef } from "react";

/** Here */
function throttle(fn, wait = 1000) {
  let lastTime = 0;

  return (args) => {
    const now = +Date.now();
    if (now - lastTime > wait) {
      fn(args);
      lastTime = now;
    }
  };
}

function foo() {
  const number = Number(document.getElementById("demo").innerText);
  document.getElementById("demo").innerHTML = `${number + 1}`;
}

const throttledFn = throttle(foo, 3000);

const Demo = () => {
  return (
    <>
      <div>节流 1000ms: 在⬇️移动鼠标</div>
      <div
        id="demo"
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
