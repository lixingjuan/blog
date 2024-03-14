/** 1. 简单应用 */
const foo = (discount) => {
  return (b) => {
    return discount * b;
  };
};

const todayDiscount = foo(0.7);

console.log(todayDiscount(200));
console.log(todayDiscount(100));

/** 2. 改进应用，无限多参数 */
const curry = (fn, ...outArgs) => {
  if (outArgs.length === fn.length) {
    return fn.apply(null, outArgs);
  }
  return (...innerArgs) => curry(fn, ...outArgs, ...innerArgs);
};

// 无限参数 加法 计算器
const add = (a, b, c) => {
  return a + b + c;
};

const unLimitedParamsAdditionCalcultor = curry(add);

console.log(unLimitedParamsAdditionCalcultor(1));
console.log(unLimitedParamsAdditionCalcultor(1)(2));
console.log(unLimitedParamsAdditionCalcultor(1)(2)(3));
