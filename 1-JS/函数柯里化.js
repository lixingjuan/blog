/** 函数柯里化 */

const curry = (fn, ...outArgs) => {
  if (fn.length === outArgs.length) {
    return fn.apply(null, outArgs);
  } else {
    return (...innerArgs) => curry(fn, ...outArgs, ...innerArgs);
  }
};

const add = (a, b, c) => {
  return a + b + c;
};

console.log(curry(add, 1));
console.log(curry(add, 1)(2));
console.log(curry(add, 1)(2)(3));
