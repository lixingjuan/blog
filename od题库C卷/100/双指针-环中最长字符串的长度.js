/**
 *
 * @题目描述
 * 给你一个字符串 s，字符串s首尾相连成一个环形，请你在环中找出字符o出现了偶数次最长子字符串的长度。
 *
 * @输入描述
 * 输入是一串小写字母组成的字符串
 *
 *
 * @输出描述
 * 输出是一个整数
 *
 *
 * @示例1
 * 输入
 * alolobo
 *
 * 输出
 * 6
 *
 * 说明
 * 最长子字符串之一是“alolob”，它包含'o'2个
 *
 * @示例2
 * 输入
 * looxdox
 *
 * 输出
 * 7
 *
 * 说明
 * 最长子字符串是"oxdolxl"，由于是首尾连接在一起的，所以最后一个'x'和开头的'l'是连接在一起的，此字符串包含2个o。
 *
 * @示例3
 * 输入
 * bcbcbc
 *
 * 输出
 * 6
 *
 * 说明
 * 这个示例中，字符串“bcbcbc”本身就是最长的，因为o'都出现了0次
 * 题解
 */

function longestSubString(s) {
  let maxLen = 0; // 最长子字符串长度
  let countO = 0; // 字符'o'的计数
  const extendedS = s + s; // 模拟环形字符串

  let left = 0; // 双指针中的左指针
  for (let right = 0; right < extendedS.length; right++) {
    if (extendedS[right] === "o") {
      countO++;
    }

    // 当右指针超过原字符串长度时，开始移动左指针
    if (right >= s.length) {
      // 更新最长子字符串长度
      if (countO % 2 === 0) {
        maxLen = Math.max(maxLen, right - left + 1 - s.length);
      }
      // 如果左指针指向的字符是'o'，则计数减1
      if (extendedS[left] === "o") {
        countO--;
      }
      left++; // 移动左指针
    }
  }

  // 最后一次检查，防止最长子字符串出现在字符串末尾
  if (countO % 2 === 0) {
    maxLen = Math.max(maxLen, extendedS.length / 2 - left);
  }

  return maxLen;
}

// 测试示例
console.log(longestSubString("alolobo")); // 6
console.log(longestSubString("looxdox")); // 7
console.log(longestSubString("bcbcbc")); // 6
