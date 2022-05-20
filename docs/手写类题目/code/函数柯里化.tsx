import React from "react";

/** ⭐️核心代码 */
const curry = (fn, ...args) => {
  if (fn.length > args.length) {
    return (...innerArgs) => curry(fn, ...[...args, ...innerArgs]);
  } else {
    return fn(...args);
  }
};
/** ⭐️核心代码 */

const testFn = (a, b, c, d, e) => {
  const result = a + b + c + d + e;
  alert(result);
};

const Demo = () => {
  return (
    <div>
      <button className="d-b mb-12" onClick={() => curry(testFn)(1, 2, 3, 4, 5)}>
        curry(testF)(1,2, 3, 4, 5)
      </button>
      <button className="d-b mb-12" onClick={() => curry(testFn, 1)(2, 3, 4, 5)}>
        curry(testFn,1)(2, 3, 4, 5)
      </button>
      <button className="d-b mb-12" onClick={() => curry(testFn, 1)(2)(3, 4, 5)}>
        curry(testFn,1)(2)( 3, 4, 5)
      </button>
      <button className="d-b mb-12" onClick={() => curry(testFn, 1)(2, 3)(4, 5)}>
        curry(testFn,1)(2, 3)( 4, 5)
      </button>
    </div>
  );
};

export default Demo;
