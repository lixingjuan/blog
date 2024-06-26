/**
 * 核心：
 * 1. 找到基准值
 * 2. 将数据分为[...quickSort(小于基准值)，基准值，...quickSort(大于基准值)]
 */
const quickSort = (arr) => {
  if (arr.length <= 1) return arr;

  // 选择第一个元素作为基准值
  const pivot = arr[0];
  const less = [];
  const greater = [];

  // 从基准值后面开始遍历数组
  for (let i = 1; i < arr.length; i++) {
    const element = arr[i];
    // 如果当前元素小于等于基准值，放入less
    if (element <= pivot) {
      less.push(element);
    } else {
      greater.push(element);
    }
  }

  // 对左右两个数组进行递归
  return [...quickSort(less), pivot, ...quickSort(greater)];
};

console.log(quickSort([]));
console.log(quickSort([1]));
console.log(quickSort([1, 2, 3]));
console.log(quickSort([3, 2, 1]));

/**
 * 快排2, 特点：交换次数少
 * @description Hoare分区
 *
 */
const sortArray = (nums) => {
  // 找到基准元素索引
  const partition = (arr, low, high) => {
    const pivot = arr[low];
    let left = low - 1;
    let right = high + 1;

    while (true) {
      // 再把右指针缩到 <= pivot 的位置
      do {
        right--;
      } while (arr[right] > pivot);

      // 再把左指针缩到 >= pivot 的位置
      do {
        left++;
      } while (arr[left] < pivot);

      if (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
      } else {
        return right;
      }
    }
  };

  const quickSort = (arr, left, right) => {
    if (left < right) {
      const pivotIndex = partition(arr, left, right);
      quickSort(arr, left, pivotIndex);
      quickSort(arr, pivotIndex + 1, right);
    }
  };

  quickSort(nums, 0, nums.length - 1);
  return nums;
};

console.log(sortArray([3, 2, 1]));
console.log(sortArray([4, 3, 2, 1]));
console.log(sortArray([0, 0, 0, 0]));
