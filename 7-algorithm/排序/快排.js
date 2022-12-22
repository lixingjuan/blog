/**
 * 核心：
 * 1. 找到基准值
 * 2. 将数据分为[...quickSort(小于基准值)，基准值，...quickSort(大于基准值)]
 */
const quickSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[0];
  const less = [];
  const greater = [];

  for (let i = 1; i < arr.length; i++) {
    const element = arr[i];
    if (element <= pivot) {
      less.push(element);
    } else {
      greater.push(element);
    }
  }

  return [...quickSort(less), pivot, ...quickSort(greater)];
};

console.log(quickSort([]));
console.log(quickSort([1]));
console.log(quickSort([1, 2, 3]));
console.log(quickSort([3, 2, 1]));

const sortArray = (nums) => {
  const partition = (arr, low, high) => {
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

    return high;
  };

  const quickSort = (arr, left, right) => {
    if (left < right) {
      const pivot = partition(arr, left, right);
      quickSort(arr, left, pivot - 1);
      quickSort(arr, pivot + 1, right);
    }
    // return arr;
  };

  quickSort(nums, 0, nums.length - 1);
  return nums;
};
