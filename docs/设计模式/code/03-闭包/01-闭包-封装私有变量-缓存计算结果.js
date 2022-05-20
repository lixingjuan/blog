/* ****************************************************************************************************
 *                                    1. 封装变量，实现缓存记忆
 ************************************************************************************************* */
let addTwoNumber = (() => {
  const cache = new Map(); // 🎀

  return (...args) => {
    const argStr = args.join(","); // 🎀

    if (cache.has(argStr)) {
      return cache.get(argStr);
    } else {
      const result = args.reduce((tol, cur) => (tol += cur), 0);
      cache.set(argStr, result);
      return result;
    }
  };
})();

console.log(addTwoNumber(1, 2)); // 3
console.log(addTwoNumber(1, 2)); // 3

/** ❗️实际开发中，如果一个大函数中的一些代码块代码块能投独立出来，我们常常把这些diamanté封装在独立的小函数中，如下 */

addTwoNumber = (() => {
  const cache = new Map();

  const getSum = (arr) => arr.reduce((tol, cur) => (tol += cur), 0); // 🎀

  return (...args) => {
    console.log(args);
    const argStr = args.join(",");

    if (cache.has(argStr)) {
      return cache.get(argStr);
    } else {
      const result = getSum(args);
      cache.set(argStr, result);
      return result;
    }
  };
})();
