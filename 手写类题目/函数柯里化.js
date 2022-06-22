const curry = (fn, ...args) => {
  // 先判断参数是否传完了，没有传完继续递归
  if (fn.length > args.length) {
    return (...innerArgs) => curry(fn, ...[...args, ...innerArgs]);
  } else {
    // 参数传完，执行函数
    return fn(...args);
  }
};

const testFn = (a, b, c, d, e) => {
  const result = a + b + c + d + e;
  return result;
};

console.log(curry(testFn)(1, 2, 3, 4, 5));
console.log(curry(testFn, 1)(2, 3, 4, 5));
console.log(curry(testFn, 1)(2)(3, 4, 5));
console.log(curry(testFn, 1)(2, 3)(4, 5));
