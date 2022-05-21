import React from "react";

const domId = "demo0";

// core-start
function throttle(fn, interval = 500) {
  let timer = null; // 定时器
  let firstTime = true; // 是否为第一次执行

  return function (...args) {
    // 如果是第一次不需要延时执行
    if (firstTime) {
      fn.apply(null, args);
      return (firstTime = false);
    }

    // 如果定时器为真，说明上次执行还没有完成
    if (timer) {
      return false;
    }

    // 延迟一段时间执行
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(null, args);
    }, interval);
  };
}

// core-end

function foo() {
  const number = Number(document.getElementById(domId).innerText);
  document.getElementById(domId).innerHTML = `${number + 1}`;
}

const throttledFn = throttle(foo, 1000);

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
