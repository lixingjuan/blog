let arr = [
  3,
  44,
  38,
  5,
  47,
  15,
  88,
  23,
  21,
  12,
  333,
  218,
  36,
  26,
  27,
  2,
  46,
  4,
  19,
  50,
  48,
];

const quickSort = (array) => {
  const sort = (arr, leftIndex = 0, rightIndex = arr.length - 1) => {
    if (leftIndex >= rightIndex) {
      // 如果左边的索引大于等于右边的索引说明整理完毕
      return;
    }
    let left = leftIndex;
    let right = rightIndex;
    const baseVal = arr[right]; // 取无序数组最后一个数为基准值

    while (left < right) {
      // 把所有比基准值小的数放在左边大的数放在右边
      while (left < right && arr[left] <= baseVal) {
        // 找到一个比基准值大的数交换
        left++;
      }
      arr[right] = arr[left]; // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（left 等于 right）
      while (right > left && arr[right] >= baseVal) {
        // 找到一个比基准值小的数交换
        right--;
      }
      arr[left] = arr[right]; // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 right）
    }
    arr[right] = baseVal; // 将基准值放至中央位置完成一次循环（这时候 right 等于 i ）
    sort(arr, leftIndex, right - 1); // 将左边的无序数组重复上面的操作
    sort(arr, right + 1, rightIndex); // 将右边的无序数组重复上面的操作
  };
  const newArr = array.concat(); // 为了保证这个函数是纯函数拷贝一次数组
  sort(newArr);
  return newArr;
};

console.log(quickSort(arr));
