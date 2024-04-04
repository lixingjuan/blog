/**
 *
 * @题目描述
 * 构成指定长度字符串的个数 (本题分值100)
 * 给定 M（0 < M ≤ 30）个字符（a-z），从中取出任意字符（每个字符只能用一次）拼接成长度为 N（0 < N ≤ 5）的字符串，
 * 要求相同的字符不能相邻，计算出给定的字符列表能拼接出多少种满足条件的字符串，
 * 输入非法或者无法拼接出满足条件的字符串则返回0。
 *
 * @输入描述
 * 给定的字符列表和结果字符串长度，中间使用空格(" ")拼接
 *
 * @输出描述
 * 满足条件的字符串个数
 *
 * @用例1
 * 输入
 * aab 2
 * 输出
 * 2
 * 说明
 * 只能构成ab,ba。
 *
 * @用例2
 * 输入
 * abc 2
 * 输出
 * 6
 * 说明
 * 可以构成：ab ac ba bc ca cb
 */

function countValidStrings(chars, N) {
  let count = 0;

  function backtrack(N, prevChar) {
    if (N === 0) {
      count++;
      return;
    }
    for (let char of chars) {
      if (char !== prevChar) {
        // 确保相同的字符不相邻
        backtrack(N - 1, char);
      }
    }
  }

  backtrack(N, ""); // 以空字符开始，表示没有前一个字符
  return count;
}

// 测试用例
console.log(countValidStrings(["a", "b"], 2)); // 2: "ab", "ba"
console.log(countValidStrings(["a", "b", "c"], 2)); // 6: "ab", "ac", "ba", "bc", "ca", "cb"
console.log(countValidStrings(["a", "b", "c"], 3)); // 12: "aba", "abc", "acb", "bac", "bca", "cab", "cba"...
console.log(countValidStrings(["a", "b", "c", "d"], 3)); // 36
console.log(countValidStrings(["a", "b", "c", "d", "e"], 1)); // 5: "a", "b", "c", "d", "e"
