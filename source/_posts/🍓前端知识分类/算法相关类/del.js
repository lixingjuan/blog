const a = [7, 92, 8, 45, 28];

/* 写法1 */
// function quickSort(array) {
//   if (array.length < 2) {
//     return array;
//   }
//   const target = array[0];
//   let left = [];
//   let right = [];
//   for (let i = 1; i < array.length; i++) {
//     if (array[i] < target) {
//       left.push(array[i]);
//     } else {
//       right.push(array[i]);
//     }
//   }
//   return [...left, target, ...right];
// }
function quickSort(array, left, right) {
  var length = array.length;
  (left = typeof left === "number" ? left : 0),
    (right = typeof right === "number" ? right : length - 1);

  if (left < right) {
    var index = left - 1;
    for (var i = left; i <= right; i++) {
      if (array[i] <= array[right]) {
        index++;
        var temp = array[index];
        array[index] = array[i];
        array[i] = temp;
      }
    }
    quickSort(array, left, index - 1);
    quickSort(array, index + 1, right);
  }
  return array;
}

console.log(quickSort(a));
