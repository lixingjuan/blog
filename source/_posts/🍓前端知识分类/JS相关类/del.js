// const demo = {
//   value: 0,
//   add1: function() {
//     console.log((this.value = this.value + 1));
//     return this;
//   },
//   sub1: function() {
//     console.log((this.value = this.value - 1));
//     return this;
//   }
// };

// demo
//   .add1()
//   .add1()
//   .sub1()
//   .sub1();

// const myPromise = new MyPromise(resolve => {
//   resolve(1);
// }).then(res => {
//   console.log(res);
// });
// const promise = new Promise(resolve => {
//   resolve(1);
// }).then(res => {
//   console.log(res);
// });

// console.log(myPromise);
// console.log(promise);

// 因为会立即执行这个执行器函数

/**
 *
 * 时间复杂度O(n*m)
 * 空间复杂度O(n*m)
 *
 * @param {*} text1
 * @param {*} text2
 */
var longestCommonSubsequence2 = function(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // 定义二维数组m行，n列，都初始化为0
  // base case为dp[0][...] 和 dp[...][0]
  const dp = [];
  for (let i = 0; i < m + 1; i++) {
    dp[i] = [];
    for (let j = 0; j < n + 1; j++) {
      dp[i][j] = 0;
    }
  }

  // 进行状态转移，从前往后遍历
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      // 找到1个 lcs 的元素，然后继续往前找
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        // 这里没有比较dp[i-1][j-1],因为它在三者中三最小的，没有必要比较
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // 最后一个元素即为结果
  return dp[m][n];
};

console.log(longestCommonSubsequence2("wedcfg", "dag"));
