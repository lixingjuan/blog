/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param array int整型一维数组
 * @return int整型一维数组
 */
function FindNumsAppearOnce(array) {
  const memo = new Set();
  array.forEach((item) => {
    if (memo.has(item)) {
      memo.delete(item);
    } else {
      memo.add(item);
    }
  });
  return [...memo].sort((a, b) => a - b);
}

console.log(FindNumsAppearOnce([1,  1, 6,4]));

module.exports = {
  FindNumsAppearOnce: FindNumsAppearOnce,
};
