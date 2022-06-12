/** 二分查找 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    if (right - left === 1) {
      return nums[right] > nums[left] ? right : left;
    }

    const midIndex = Math.floor((right - left) / 2) + left;
    const pivot = nums[midIndex];
    const pre = nums[midIndex - 1];
    const next = nums[midIndex + 1];

    if (pivot > pre && pivot > next) {
      return midIndex;
    } else if (pivot < next) {
      left = midIndex;
    } else if (pivot < pre) {
      right = midIndex;
    }
  }
  return left;
};

/** 寻找最大值 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let maxIndex = 0;
  nums.forEach((it, idx) => {
    if (it > nums[maxIndex]) {
      maxIndex = idx;
    }
  });
  return maxIndex;
};

console.log(findPeakElement([1, 2, 3, 1]) === 2);
