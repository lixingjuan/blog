/*
 * @version: 0.0.1
 * @Author: lixingjuan <xingjuan.li@hand-china.com>
 * @Date: 2020-02-25 11:25:10
 * @copyright: Copyright (c) 2019, Hand
 */
// const person = [
//   { name: "green", age: 21 },
//   { name: "red", age: 16 }
// ];
// 获取person的所有name属性
/* eg.1 遍历 */
// console.log(person.map(item => item.name));

// const curry = function(fn) {
//   var args = [].slice.call(arguments, 1);
//   return function() {
//     var newArgs = args.concat([...arguments]);
//     return fn.apply(this, newArgs);
//   };
// };
// function add(a, b) {
//   return a + b;
// }
// console.log(curry(add, 1)(2));

// function sub_curry(fn) {
//   var args = [].slice.call(arguments, 1);
//   return function() {
//     return fn.apply(this, args.concat([].slice.call(arguments)));
//   };
// }
// function curry(fn, length) {
//   length = length || fn.length;

//   var slice = Array.prototype.slice;

//   return function() {
//     if (arguments.length < length) {
//       var combined = [fn].concat(slice.call(arguments));
//       return curry(sub_curry.apply(this, combined), length - arguments.length);
//     } else {
//       return fn.apply(this, arguments);
//     }
//   };
// }

// var fn = curry(function(a, b, c) {
//   return [a, b, c];
// });
// console.log(fn(1, 2)(3));

// /* 用于返回一个柯里化版本的函数 */
function curry(fn, ...args) {
  return (..._arg) => {
    return fn(...args, ..._arg);
  };
}
console.log(
  curry(function(a, b) {
    return a + b;
  })(1, 2, 3)
);

// let funcA = a => {
//   return b => {
//     return c => a * b * c;
//   };a
// };
// funcA(1)(2)(3);
/**
 * @des:
 * @param {Function} fn 希望可以化的函数
 * @param {*} [参数们]
 * @return {Function} 柯里化之后的函数
 */
// function curry(fn, ...args) {
//   return (..._args) => fn(...args, ..._args);
// }
// function demo(a, b, c) {
//   return a + b + c;
// }
// const twoAdd = curry(demo, 1);
// console.log(twoAdd(2, 3));

/* js高级程序设计上的例子 */

/* call */
// 作用1: 传递参数很方便
function sum(a, b) {
  return a + b;
}
function saySum(c, d) {
  return sum.call(this, c, d);
}
function sayApplySum() {
  return sum.apply(this, arguments);
}
function sayApplySum2(c, d) {
  return sum.apply(this, [c, d]);
}
console.log(saySum(1, 2));
console.log(sayApplySum(1, 2));
console.log(sayApplySum2(1, 2));
// 作用2: 扩充函数赖以运行的作用域
