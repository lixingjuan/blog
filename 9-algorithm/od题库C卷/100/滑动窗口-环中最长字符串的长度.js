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
 * looxdolx
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
  const doubledS = s + s; // 将字符串复制一遍并拼接，模拟环形

  let maxLen = 0; // 初始化最长子字符串长度为0

  // 检查当前字符串段中'o'的出现次数是否为偶数
  function isEvenOs(substring) {
    const countO = [...substring].filter((char) => char === "o").length;
    return countO % 2 === 0;
  }

  // 使用滑动窗口检查所有可能的子字符串
  for (let start = 0; start < s.length; start++) {
    for (let end = start + 1; end <= start + s.length; end++) {
      const currentSub = doubledS.substring(start, end);

      if (isEvenOs(currentSub) && currentSub.length > maxLen) {
        maxLen = currentSub.length;
      }
    }
  }

  // 返回最大长度
  return maxLen;
}

// 测试用例 1: 示例1
console.log(longestSubString("alolobo") === 6);

// 测试用例 2: 示例2
console.log(longestSubString("looxdolx") === 7);

// 测试用例 3: 示例3
console.log(longestSubString("bcbcbc") === 6);

// 测试用例 4: 不包含字符'o'
console.log(longestSubString("abcd") === 4);

// 测试用例 5: 'o'只出现一次
console.log(longestSubString("hello") === 4);

// 测试用例 6: 所有字符都是'o'
console.log(longestSubString("ooooo") === 4);

// 测试用例 7: 'o'出现偶数次，但不是连续的
console.log(longestSubString("oloxdxo") === 6);

// 测试用例 8: 空字符串
console.log(longestSubString("") === 0);
