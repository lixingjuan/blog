/** 函数柯里化 */
const curry = (fn, ...args) => {
  // 参数已经传完, 则直接执行
  if (fn.length === args.length) {
    return fn.apply(null, args);
  }

  return (...innerArgs) => curry(fn, ...[...args, ...innerArgs]);
};

const testFn = (a, b, c, d, e) => {
  const result = a + b + c + d + e;
  return result;
};

console.log(curry(testFn)(1, 2, 3, 4, 5));
console.log(curry(testFn, 1)(2, 3, 4, 5));
console.log(curry(testFn, 1)(2)(3, 4, 5));
console.log(curry(testFn, 1)(2, 3)(4, 5));
