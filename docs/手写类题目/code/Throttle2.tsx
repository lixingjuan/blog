import React from "react";

const domId = "demo2";

/** Here */
const throttle = (fn, wait = 300) => {
  let timer = null;

  return (args) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn(args);
      }, wait);
    }
  };
};

function foo() {
  const number = Number(document.getElementById(domId).innerText);
  document.getElementById(domId).innerHTML = `${number + 1}`;
}

const throttledFn = throttle(foo, 500);

const Demo = () => {
  return (
    <>
      <div>节流 1000ms: 在⬇️移动鼠标</div>
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
