/* ****************************************************************************************************
 *                                    封装私有变量，实现缓存记忆
 ************************************************************************************************* */

const addTwoNumber = (() => {
  const cache = new Map();

  const getSum = (arr) => arr.reduce((tol, cur) => (tol += cur), 0);
  const getSortedArr = (arr) => [...arr].sort((a, b) => a - b);

  return (...args) => {
    const sortedArr = getSortedArr(args);
    const argStr = sortedArr.join(",");

    // 1. 已缓存
    if (cache.has(argStr)) {
      return cache.get(argStr);
    }

    // 2. 未缓存
    const result = getSum(sortedArr);
    cache.set(argStr, result);
    return result;
  };
})();

console.log(addTwoNumber(1, 2)); // 3
console.log(addTwoNumber(1, 2)); // 3
console.log(addTwoNumber(1, 2)); // 3
