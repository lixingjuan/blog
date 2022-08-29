var isPalindrome = function (x) {
  if (x === 0) return true;
  if (x < 0 || x % 10 === 0) return false; //实例的两个特例
  let reverse = 0;
  let rest = x;

  while (rest >= 10) {
    reverse = reverse * 10 + (rest % 10);
    rest = Math.floor(rest / 10);
  }
  return reverse * 10 + rest === x;
};

console.log(isPalindrome(121));
