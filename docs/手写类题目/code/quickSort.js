let arr = [3, 44, 38, 5, 47, 15, 88, 23, 21, 12, 333, 218, 36, 26, 27, 2, 46, 4, 19, 50, 48];

const quickSort = (array) => {
  const sort = (arr, lowIndex = 0, highIndex = arr.length - 1) => {
    // 如果左边的索引大于等于右边的索引说明整理完毕
    if (lowIndex >= highIndex) {
      return arr;
    }

    let low = lowIndex;
    let high = highIndex;
    const baseVal = arr[high]; // 取无序数组最后一个数为基准值

    while (low < high) {
      // 把所有比基准值小的数放在左边大的数放在右边
      while (low < high && arr[low] <= baseVal) {
        low++;
      }
      arr[high] = arr[low];

      while (low < high && arr[high] >= baseVal) {
        high--;
      }
      arr[low] = arr[high];
    }

    // 将基准值放至中央位置完成一次循环（这时候 high 等于 i ）
    arr[high] = baseVal;
    // 将左边的无序数组重复上面的操作
    sort(arr, lowIndex, high - 1);
    // 将右边的无序数组重复上面的操作
    sort(arr, high + 1, highIndex);
    return arr;
  };

  return sort(array);
};

console.log(quickSort(arr));
