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

function quickSort(arr) {
  if (arr.length < 1) {
    return arr;
  }

  let left = [];
  let right = [];
  let flag = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > flag) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return [...quickSort(left), flag, ...quickSort(right)];
}

console.log(quickSort(arr));
