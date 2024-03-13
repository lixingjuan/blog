// 1. 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

// 测试用例
const arr = [5, 3, 8, 4, 2];
console.log(quickSort(arr)); // [2, 3, 4, 5, 8]