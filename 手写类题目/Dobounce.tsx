import React from "react";

function dobounce(fn, wain) {
  let timer;

  return (params) => {
    clearTimeout(timer);
    timer = setTimeout(fn, wain, params);
  };
}
const foo = (val) => {
  // console.log();
  alert(`hello ${val}`);
};

const dobouncedFoo = dobounce(foo, 1000);

const Demo = () => {
  return (
    <div>
      <div>防抖 1000ms: </div>
      <input onChange={(e) => dobouncedFoo(e.target.value)} placeholder="请输入打招呼名字" />
    </div>
  );
};

export default Demo;
