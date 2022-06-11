/* ****************************************************************************************************
 *                                    封装私有变量，实现缓存记忆
 ************************************************************************************************* */

const addTwoNumber = (() => {
  const cache = new Map();

  /**
   * 若一个大函数中的一些代码块能够独立出来，
   * 我们常常把这些代码封装在独立的小函数中，
   * 如下
   */
  // highlight-start
  const getSum = (arr) => {
    return arr.reduce((tol, cur) => (tol += cur), 0);
  };
  // highlight-end

  return (...args) => {
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

console.log(addTwoNumber(1, 2)); // 3
console.log(addTwoNumber(1, 2)); // 3
console.log(addTwoNumber(1, 2)); // 3
