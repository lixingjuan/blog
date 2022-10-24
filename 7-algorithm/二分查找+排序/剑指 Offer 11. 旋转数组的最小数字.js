/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    let pivot = left + Math.floor((right - left) / 2);
    const baseVal = numbers[pivot];
    const highVal = numbers[right];
    // 中间值小于最大值，说明最小值在中间值的左侧
    if (baseVal < highVal) {
      right = pivot;
    } else if (baseVal > highVal) {
      left = pivot + 1;
    } else {
      right = right - 1;
    }
  }
  return numbers[left];
};

console.log(minArray([2, 2, 2, 0, 1]));
console.log(minArray([1, 1]));
