/**
 * @题目
 * 给定一个含有N个正整数的数组, 求出有多少个连续区间（包括单个正整数）, 它们的和大于等于x。
 *
 * @输入描述
 * 第一行两个整数N x（0 < N <= 100000, 0 <= x <= 10000000)
 * 第二行有N个正整数（每个正整数小于等于100)。
 *
 * @用例1
 */

const demo = (array, x) => {
  let left = 0;
  let sum = 0;
  let count = 0;

  for (let right = 0; right < array.length; right++) {
    sum += array[right];
    // 当当前和大于等于x时，开始移动左指针，直到和小于x
    while (sum >= x) {
      count += right - left + 1; // 对于每个右指针，可能的连续区间数量等于右指针与左指针的距离 + 1
      sum -= array[left]; // 移动左指针，并更新区间和
      left++;
    }
  }

  return count;
};
console.log(demo([2, 2, 3], 2));
console.log(demo([1, 2, 1], 2));
