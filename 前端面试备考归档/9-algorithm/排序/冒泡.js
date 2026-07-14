/**
 * 重复交换相邻元素，如果位置错误，就交换他们
 * 在每一轮的遍历中，最大的元素会被遍历到数组的末尾
 */

/**
 * 核心：1. 不符合顺序交换位置
 * 优化：如果上一轮无交换则排序完成
 */

/**
 * 最好时间复杂度：O(n)
 * 最坏/平均时间复杂度：O(n^2)
 * 空间复杂度：O(1) - 原地交换，不需要额外的内存空间
 * 稳定性：稳定
 * @describe 冒泡排序
 * @example
 */
function bubbleSort(nums) {
  let times = nums.length;
  // 表示在上一轮交换过位置，即排序仍未完成
  let swapped = false;

  do {
    // 每次都重置交换flag
    swapped = false;
    for (let i = 1; i < times; i++) {
      if (nums[i - 1] > nums[i]) {
        [nums[i - 1], nums[i]] = [nums[i], nums[i - 1]];
        swapped = true;
      }
    }
    times--;
  } while (swapped);

  console.log(nums);
}

bubbleSort([2]);
bubbleSort([8, 2]);
bubbleSort([8, 2, 1]);
bubbleSort([8, 7, 2, 1]);
bubbleSort([8, 7, 6, 2, 1]);
bubbleSort([8, 7, 6, 5, 2, 1]);
bubbleSort([2, 1, 10, 3, 5, 6, 7, 8, 9]);
