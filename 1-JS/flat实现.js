/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let res = [];
  let max = 0;

  for (let str of s) {
    while (res.includes(str)) {
      res.shift();
    }
    res.push(str);
    max = Math.max(max, res.length);
  }
  return max;
};
