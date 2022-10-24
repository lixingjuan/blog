/** 方法1 */
function MoreThanHalfNum_Solution(numbers) {
  if (numbers.length === 1) {
    return numbers[0];
  }

  const memo = new Map();
  let maxKey = numbers[0];
  numbers.forEach((it) => {
    if (memo.has(it)) {
      const times = memo.get(it) + 1;
      memo.set(it, times);
      if (times > memo.get(maxKey)) {
        maxKey = it;
      }
    } else {
      memo.set(it, 1);
    }
  });

  return maxKey;
}

/** 方法2: 快速排序，结果肯定位置数据中间位置 */
function MoreThanHalfNum_Solution2(numbers) {
  const partion = (arr, low, high) => {
    const pivot = arr[low];
    while (low < high) {
      while (low < high && arr[high] >= pivot) {
        high--;
      }
      arr[low] = arr[high];
      while (low < high && arr[low] <= pivot) {
        low++;
      }
      arr[high] = arr[low];
    }
    arr[low] = pivot;
    return low;
  };

  const quickSort = (arr, low, high) => {
    if (low < high) {
      const pivot = partion(arr, low, high);
      quickSort(arr, low, pivot - 1);
      quickSort(arr, pivot + 1, high);
    }
    return arr;
  };

  const sortedArr = quickSort(numbers, 0, numbers.length - 1);
  return sortedArr[Math.floor(sortedArr.length / 2)];
}

// module.exports = {
//   MoreThanHalfNum_Solution: MoreThanHalfNum_Solution,
// };

// console.log(MoreThanHalfNum_Solution([1, 2, 3, 2, 2, 2, 5, 4, 2]));

console.log(MoreThanHalfNum_Solution2([9, 8, 7, 6, 5, 4, 3]));
