/**
 * @name 快速排序
 * @description 将数组分成两半，递归进行排序，选择基准值，循环和基准值做比较，大于基准值的放在右边，否砸放在左边
 *
 * 平均时间复杂度O(nlogn)
 * 最优时间复杂度O(nlogn)
 * 最坏时间复杂度O(n^2)
 * 空间复杂度和时间有关
 */
const sortArray = (nums) => {
  const partion = (arr, low, high) => {
    const pivot = arr[low];

    while (low < high) {
      // 先从右边开始找到比pivot小的数，赋值该数给low
      while (low < high && arr[high] >= pivot) {
        high--;
      }
      arr[low] = arr[high];

      // 再从左边开始找到比pivot大的数，赋值该数给high
      while (low < high && arr[low] <= pivot) {
        low++;
      }
      arr[high] = arr[low];
    }

    // 最后将pivot放在正确的位置
    arr[low] = pivot;

    // 此时low === high, 返回其索引，便于将数组拆分
    return high;
  };

  const quickSort = (arr, left, right) => {
    if (left < right) {
      const pivot = partion(arr, left, right);
      // 拆分的数组分别排序
      quickSort(arr, left, pivot - 1);
      quickSort(arr, pivot + 1, right);
    }
  };

  quickSort(nums, 0, nums.length - 1);
  return nums;
};

console.log(sortArray([3, 2, 1]));
