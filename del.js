/**
 * @des 中心扩散法
 * 2. 定义两个变量，一个start存储最大回文字符串的开始位置，maxLength 记录最大长度，则返回结果  s.subString(start, start+maxLength)
 * 3. 创建一个helper 函数，入参 左右指针，判断left 和right 位置的值是否相等，left right指针是否越界，
 * 如果以上条件都满足，则判断是否要更回文字符串最大长度和起始字符串的位置，然后left--, right++, 直至不满足条件为止‘
 * 4. 遍历字符串，每个位置调用 helper 函数两遍，第一遍检查 i-1, i+1, 第二遍检查 i, i+
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = (s = "") => {
  if (s.length < 2) {
    return s.slice(0, 1);
  }
  let start = 0;
  let maxLength = 1;
  const strArr = [...s];

  const expandAroundCenter = (left, right) => {
    // left 和 right 指针都在数组范围内才处理
    while (left >= 0 && right < s.length && strArr[left] === strArr[right]) {
      if (right - left + 1 > maxLength) {
        maxLength = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  };

  for (let i = 0; i < s.length; i += 1) {
    expandAroundCenter(i - 1, i + 1);
    // 当 i=2
    expandAroundCenter(i, i + 1);
  }
  return s.substring(start, start + maxLength);
};
