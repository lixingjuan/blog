/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param nums int整型一维数组
 * @return int整型
 */
function minNumberDisappeared(nums) {
  const memoSet = new Set(nums);

  let i = 1;
  while (memoSet.has(i)) {
    i++;
  }
  return i;
}

module.exports = {
  minNumberDisappeared: minNumberDisappeared,
};

console.log(minNumberDisappeared([1, 1]));
