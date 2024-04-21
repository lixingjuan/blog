/** 插入排序 */
function insertionSort(arr) {
  let preIndex = undefined;
  let current = undefined;

  // 遍历数组
  for (let i = 1; i < arr.length; i++) {
    current = arr[i];
    preIndex = i - 1;

    // while循环：当前元素如果大于
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }

    arr[preIndex + 1] = current;
  }
  return arr;
}

console.log(insertionSort([3, 2, 1]));
