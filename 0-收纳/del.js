/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }
  if (x === 0) {
    return true;
  }

  let result = x;
  let remaining = 0;
  let temp = 0;
  while (result !== 0) {
    remaining = result % 10;
    temp = temp * 10 + remaining;
    result = result / 10;
  }

  return result === temp
};
