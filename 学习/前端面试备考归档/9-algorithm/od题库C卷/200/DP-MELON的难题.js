/**
 * @题目描述
 * MELON有一堆精美的雨花石(数量为n,重量各异),准备送给S和W。MELON希望送给俩人的雨花石重量一致，请你设计一个程序，帮MELON确认是否能将雨花石平均分配。
 *
 * @输入描述
 * 第1行输入为雨花石个数：n,0<n<31。
 * 第2行输入为空格分割的各雨花石重量：m[0]m[1].....m[n-1],0<m[k]<1001。不需要考虑异常输入的情况。
 *
 * @输出描述
 * 如果可以均分，从当前雨花石中最少拿出几块，可以使两堆的重量相等；如果不能均分，则输出-1。
 *
 * @用例1
 * 输入
 * 4
 * 1122
 * 输出
 * 2
 * 说明
 *
 * 输入第一行代表共4颗雨花石，
 * 第二行代表4颗雨花石重量分别为1、1、2、2。
 * 均分时只能分别为1,2,需要拿出重量为1和2的两块雨花石，所以输出2。
 */
function minStonesToRemove(n, stones) {
  const total = stones.reduce((sum, weight) => sum + weight, 0);

  // 如果总重量是奇数，则无法平分
  if (total % 2 !== 0) return -1;

  const half = total / 2;
  const dp = Array.from({ length: half + 1 }, () => 0);

  // 动态规划找到最接近half的组合的总重量
  for (let i = 0; i < n; i++) {
    for (let j = half; j >= stones[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i]);
    }
  }

  // 如果最接近half的组合总重量不等于half，则无法平分
  if (dp[half] !== half) return -1;

  let minNum = n; // 初始化为最大可能值，即所有石头的数量
  for (let i = 0; i <= half; i++) {
    if (dp[i] === half) {
      let temp = i;
      let count = 0;
      // 从最大值开始向下查找，计算达到该重量所需的最小石头数
      for (let j = n - 1; j >= 0 && temp > 0; j--) {
        if (temp >= stones[j] && dp[temp - stones[j]] == temp - stones[j]) {
          temp -= stones[j];
          count++;
        }
      }
      // 更新最少需要拿出的石头数
      minNum = Math.min(minNum, n - count);
    }
  }

  return minNum === n ? -1 : minNum;
}

// 测试用例
console.log(minStonesToRemove(4, [1, 1, 2, 2])); // 应该输出 2

// const rl = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let lineCount = 0;
// let amount = 0; // 雨花石总数

// rl.on("line", (line) => {
//   lineCount++;
//   if (lineCount === 1) {
//     amount = parseInt(line, 10);
//     return;
//   }

//   const arr = line.split(" ").map(Number); // 所有的雨花石
//   const sum = line.reduce((pre, cur) => pre + cur, 0);
//   if (sum % 2 !== 0) {
//     console.log(-1);
//     rl.close();
//     return;
//   }

//   // 有可能均分
//   const target = sum / 2; // 我们的目标是找到能够组成target的雨花石
//   const dp = []; // 如果目标是

//   for (let i = 1; i < arr.length; i++) {
//     for (let j = 0; j < target; j++) {

//     }

//   }
// });
