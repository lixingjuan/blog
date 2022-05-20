// /**
//  * @param {string} s
//  * @return {string}
//  */
// var longestPalindrome = function (s) {
//   const len = s.length;
//   if (len < 2) {
//     return s;
//   }

//   let maxLen = 1;
//   let begin = 0;
//   // dp[i][j] 表示 s[i..j] 是否是回文串
//   const dp = Array.from({ length: len }).fill([undefined, undefined]);

//   // 初始化：所有长度为 1 的子串都是回文串
//   for (let i = 0; i < len; i++) {
//     dp[i][i] = true;
//   }

//   const charArray = [...s];
//   // 递推开始
//   // 先枚举子串长度
//   for (let L = 2; L <= len; L++) {
//     // 枚举左边界，左边界的上限设置可以宽松一些
//     for (let i = 0; i < len; i++) {
//       // 由 L 和 i 可以确定右边界，即 j - i + 1 = L 得
//       let j = L + i - 1;
//       // 如果右边界越界，就可以退出当前循环
//       if (j >= len) {
//         break;
//       }

//       if (charArray[i] != charArray[j]) {
//         dp[i][j] = false;
//       } else {
//         if (j - i < 3) {
//           dp[i][j] = true;
//         } else {
//           dp[i][j] = dp[i + 1][j - 1];
//         }
//       }

//       // 只要 dp[i][L] == true 成立，就表示子串 s[i..L] 是回文，此时记录回文长度和起始位置
//       if (dp[i][j] && j - i + 1 > maxLen) {
//         maxLen = j - i + 1;
//         begin = i;
//       }
//     }
//   }
//   return s.substring(begin, begin + maxLen);
// };

// console.log(longestPalindrome(""));
// console.log(longestPalindrome("a"));
// console.log(longestPalindrome("aa"));
// console.log(longestPalindrome("ac"));
// console.log(longestPalindrome("aba"));

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const len = s.length;
  if (len < 2) {
    return s;
  }

  const dp = Array.from({ length: len }).map((it) => Array.from({ length: len }).fill(false));
  let maxLenIndex = [0, 0];

  const charArray = [...s];

  for (let column = 2; column < len; column++) {
    for (let row = 0; row < len; row++) {
      if (row >= column) {
        continue;
      }

      if (row) dp[row][column] = dp[row - 1][column - 1];
    }
  }
  // for (let row = 0; row < len; row++) {
  //   for (let column = 0; column < len; column++) {
  //     if (row === column) {
  //       dp[row][column] = true;
  //       continue;
  //     }
  //     if (row > column) {
  //       continue;
  //     }
  //     if (column - row > 2 && row < 0 && column > 0) {
  //       dp[row][column] = dp[row - 1][column - 1];
  //     } else {
  //       dp[row][column] = charArray[row] === charArray[column];
  //     }
  //   }
  //   // 每次完成一列的填充后，更新差值最大的位置
  //   const rowArr = dp[row];
  //   // 每列，第一个为真的元素的差值最大

  // }

  console.log(dp.lastIndexOf((it) => it.includes(true)));

  console.log(dp);
};
longestPalindrome("babab");

let cc = [
  [true, false, true, false, true],
  [false, true, false, true, false],
  [false, false, true, false, true],
  [false, false, false, true, false],
  [false, false, false, false, true],
];

cc.lastIndexOf([false, false, false, false, true]);
