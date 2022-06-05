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

    return high;
  };

  const quickSort = (arr, left, right) => {
    if (left < right) {
      const pivot = partion(arr, left, right);
      quickSort(arr, left, pivot - 1);
      quickSort(arr, pivot + 1, right);
    }
  };

  quickSort(nums, 0, nums.length - 1);
  return nums;
};

console.log(sortArray([3, 2, 1]));
