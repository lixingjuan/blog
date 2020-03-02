/* 函数柯里化 */
// eg.1
function discount(dis, price) {
  return dis * price;
}
function discount2(dis) {
  return function(price) {
    return dis * price;
  };
}
console.log(discount(0.01, 200));
const fiveDiscount = discount2(0.05);
console.log(fiveDiscount(300));

// eg.2 :产生柯里化的函数
function curry(fn, ...args) {
  return (..._args) => {
    if (_args.length > 1) {
      return curry(fn, ...args, ..._args);
    } else {
      return fn(...args, ..._args);
    }
  };
}
const addThree = curry(function(a, b) {
  return a + b;
});
console.log(addThree(1));

// function a(...args) {
//   console.log(args);
// }
// console.log(a(1, 2));
