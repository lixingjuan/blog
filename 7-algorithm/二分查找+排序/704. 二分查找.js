/**
 * 请实现无重复数字的升序数组的二分查找
 *
 * 给定一个 元素升序的、无重复数字的整型数组 nums 和一个目标值 target ，
 * 写一个函数搜索 nums 中的 target，如果目标值存在返回下标（下标从 0 开始），否则返回 -1
 */

/**
 * @param nums int整型一维数组
 * @param target int整型
 * @return int整型
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((right - left) / 2) + left; // 🔴 注意，此时中间索引不能使用数组长度求得
    console.log(mid);
    const midVal = nums[mid];

    if (midVal === target) {
      return mid;
    } else if (midVal > target) {
      right = mid - 1; // 🔴 减1, 当前值已经不需要再判断
    } else {
      left = mid + 1; // 🔴 (同上)加1, 当前值已经不需要再判断
    }
  }
  return -1;
}

console.log(search([1, 2, 3], 3) === 2);
console.log(search([-1, 0, 3, 5, 9, 12], 2) === -1);
console.log(search([], 3) === -1);
console.log(search([-1, 0, 3, 4, 6, 10, 13, 14], 13) === 6);
console.log(search([-1, 0, 3, 4, 6, 10, 13, 14], 2) === -1);
console.log(search([-1, 0, 3, 4, 6, 10, 13, 14], 15) === -1);
console.log(search([-1, 0, 3, 4, 6, 10, 13, 14, 15], 4) === 3);
