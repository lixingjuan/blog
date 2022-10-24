/**
 *
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那两个整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums: number[], target: number) {
  // key: 元素值; value: index
  const memoMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    const diffValue = target - element;

    if (memoMap.has(diffValue)) {
      return [i, memoMap.get(diffValue)];
    } else {
      memoMap.set(element, i);
    }
  }
};

console.log(twoSum([2, 7, 11, 15], 9)); // [0,1]
