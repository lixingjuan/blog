/* ****************************************************************************************************
 *                                    闭包的应用
 ************************************************************************************************* */

/** 函数柯里化，保存一部分参数 */
const curry = function (fn, ...outer) {
  return (...inner) => {
    const args = [...outer, ...inner];
    if (args.length < fn.length) {
      return curry(fn, args);
    } else {
      return fn(args);
    }
  };
};

const mutiply = (a, b, c) => {
  return a * b * c;
};

const aa = curry(mutiply);
console.log(aa(1)(2)(3));

// /** 防抖 */
// const dobounce = function (fn, time) {
//   let startTime = Date.now();

//   return function (args) {
//     if (Date.now() - startTime > time) {
//       fn.apply(args);
//     } else {
//       startTime = Date.now();
//     }
//   };
// };

// /** 节流 */
// const throttle = function (fn, time) {
//   let lastTime = Date.now();
//   let isFirstTime = true;

//   return function () {
//     if (isFirstTime) {
//       fn.apply(args);
//       isFirstTime = false;
//       lastTime = Date.now();
//       return;
//     }

//     if (Date.now() - lastTime > time) {
//       fn.apply(args);
//       lastTime = Date.now();
//       return;
//     }
//   };
// };

// /** 实现私有属性 */
// const sayHello = function () {
//   const val = "lixingjan";
//   return () => {
//     return `hello${val}`;
//   };
// };

// const a = sayHello();
// a();
