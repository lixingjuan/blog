function insertionSort(arr) {
  let preIndex = undefined;
  let current = undefined;

  for (let i = 0; i < arr.length; i++) {
    current = arr[i];
    preIndex = i - 1;

    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }

    arr[preIndex + 1] = current;
  }
  return arr;
}

console.log(insertionSort([3, 2, 1]));
