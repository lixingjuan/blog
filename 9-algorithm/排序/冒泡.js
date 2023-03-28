/**
 * 核心：1. 不符合顺序交换位置
 * 优化：如果上一轮无交换则排序完成
 */

/**
 * 平均时间复杂度：O(n^2)
 * 最坏时间复杂度：O(n^2)
 * 最好时间复杂度：O(n)
 * 空间复杂度：O(1)
 * 稳定性：稳定
 * @describe 冒泡排序
 * @example
 */
function bubbleSort(nums) {
  let times = nums.length;
  let exchange = true;

  // 外层表示冒泡次数
  while (times-- && exchange) {
    exchange = false;
    for (let i = 0; i < times; i++) {
      if (nums[i] > nums[i + 1]) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
        exchange = true;
      }
    }
  }

  return nums;
}

bubbleSort([2]);
bubbleSort([8, 2]);
bubbleSort([8, 2, 1]);
bubbleSort([8, 7, 2, 1]);
bubbleSort([8, 7, 6, 2, 1]);
bubbleSort([8, 7, 6, 5, 2, 1]);
bubbleSort([2, 1, 10, 3, 5, 6, 7, 8, 9]);
