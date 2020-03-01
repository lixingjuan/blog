/*
 * @version: 0.0.1
 * @Author: lixingjuan <xingjuan.li@hand-china.com>
 * @Date: 2020-02-28 19:14:21
 * @copyright: Copyright (c) 2019, Hand
 */
/* apply,call的使用 */
// 作用1：可以更方便的传递参数
Math.max(1, 2, 3);
Math.max.call(this, [1, 2, 3]);
// 作用2：扩充作用域
const color = "red";
const ooooo = {
  color: "blue"
};
function sayColor() {
  console.log(this.color);
}
console.log(sayColor()); // red
console.log(sayColor.apply(ooooo)); // red

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
