/** 最长回文字符串 */
/**
 * @param {string} s
 * @return {string}
 * @desc 中心扩散法，从每一个字符开始向两端扩散，找最长的
 */
var longestPalindrome = function (s) {
  if (s.length <= 1) return s;
  let longest = "";

  // !注意：奇数和偶数都要考虑
  const centerSpread = (start, end) => {
    while (start >= 0 && end < s.length && s[start] === s[end]) {
      start--;
      end++;
    }
    return s.substring(start + 1, end);
  };

  for (let i = 0; i < s.length; i++) {
    const str1 = centerSpread(i, i);
    const str2 = centerSpread(i, i + 1);
    const curStr = str1.length > str2.length ? str1 : str2;
    longest = longest.length > curStr.length ? longest : curStr;
  }

  return longest;
};

// console.log(longestPalindrome("b"));
console.log(longestPalindrome("cbbd"));
// console.log(longestPalindrome("bab"));
// console.log(longestPalindrome("cbab"));
// console.log(longestPalindrome("babad"));
// console.log(longestPalindrome("babab"));
