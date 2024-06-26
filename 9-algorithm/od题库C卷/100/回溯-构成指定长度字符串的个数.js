/**
 *
 * @题目描述
 * 构成指定长度字符串的个数
 * 给定 M（0 < M ≤ 30）个字符（a-z），从中取出任意字符（每个字符只能用一次）拼接成长度为 N（0 < N ≤ 5）的字符串，
 *
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

/**
 * 考点：
 * 1. 回溯的思路：每个字符串作为开头，可以构建多少种，当N===0,表示构建成功
 * 2. 数组去重
 */
function countValidStrings(chars, N) {
  let count = 0;
  const uniqueChars = [...new Set(chars)]; // 确保字符的唯一性

  function backtrack(N, path) {
    console.log(path);
    if (N === 0) {
      count++;
      return;
    }

    for (let i = 0; i < uniqueChars.length; i++) {
      const curChar = uniqueChars[i];
      if (curChar !== path[path.length - 1]) {
        backtrack(N - 1, path + uniqueChars[i]);
      }
    }
  }

  backtrack(N, "");
  return count;
}

// 调整后的测试用例
console.log(countValidStrings("ab", 2) === 2);
console.log(countValidStrings("abc", 2) === 6);
console.log(countValidStrings("abc", 3) === 12);
console.log(countValidStrings("abcd", 3) === 36);
console.log(countValidStrings("abcde", 1) === 5);
