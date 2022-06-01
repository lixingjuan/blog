const quickSort = (array) => {
  const sort = (arr, lowIndex = 0, highIndex = arr.length - 1) => {
    // 如果左边的索引大于等于右边的索引说明整理完毕
    if (arr.length <= 1 || lowIndex >= highIndex) {
      return arr;
    }

    let low = lowIndex;
    let high = highIndex;

    // core-start
    while (low < high) {
      while (low < high && arr[low] <= arr[high]) {
        low++;
      }
      [arr[high], arr[low]] = [arr[low], arr[high]];

      while (low < high && arr[low] <= arr[high]) {
        high--;
      }
      [arr[high], arr[low]] = [arr[low], arr[high]];
    }
    // core-end

    // core-start
    // 将左边的无序数组, 重复上面的操作
    sort(arr, lowIndex, high - 1);
    // 将右边的无序数组, 重复上面的操作
    sort(arr, high + 1, highIndex);
    // core-end

    return arr;
  };

  return sort(array);
};

console.log(quickSort([]));
console.log(quickSort([1, 2]));
console.log(quickSort([1]));
console.log(
  quickSort([3, 1, 44, 38, 5, 47, 15, 88, 23, 21, 12, 333, 218, 36, 26, 27, 2, 46, 4, 19, 50, 48])
);
console.log(
  quickSort([
    1, 90, 3, 44, 38, 5, 47, 15, 88, 23, 21, 12, 333, 218, 36, 26, 27, 2, 46, 4, 19, 50, 48,
  ])
);
