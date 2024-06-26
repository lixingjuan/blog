/**
 * @题目描述
 * 在一个机房中，服务器的位置标识在n*m的整数矩阵网格中，1表示单元格上有服务器，0表示没有。
 * 如果两台服务器位于同一行或者同一列中紧邻的位置，则认为它们之间可以组成一个局域网，请你统计机房中最大的局域网包含的服务器个数。
 *
 * @输入描述
 * 第一行输入两个正整数，n和m，0<n,m<=100
 *
 * 之后为n*m的二维数组，代表服务器信息
 *
 * @输出描述
 * 最大局域网包含的服务器个数
 *
 *
 * @示例
 * 输入：
 * 2 2
 * 1 0
 * 1 1
 * 输出：
 * 3
 * 说明： [0][0]、[1][0]、[1][1] 三台服务器互相连接，可以组成局域网。
 */

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0;
let n = 0;
let m = 0;
const grid = [];

readline.on("line", (line) => {
  lineCount++;
  if (lineCount === 1) {
    [n, m] = line.split(" ").map(Number);
    return;
  }

  if (lineCount < n + 1) {
    grid.push(line.split(" ").map(Number));
    return;
  }
  if (lineCount === n + 1) {
    grid.push(line.split(" ").map(Number));

    // 开始处理
    const dfs = (i, j, count) => {
      if (i < 0 || i >= n || j < 0 || j >= m || grid[i][j] === 0) {
        return count;
      }
      count += 1;
      count = dfs(i - 1, j, count); // 上
      count = dfs(i + 1, j, count); // 下
      count = dfs(i, j - 1, count); // 左
      count = dfs(i, j + 1, count); // 右
      return count;
    };

    let maxCount = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        maxCount = dfs(i, j, 0);
      }
    }
    console.log(maxCount);
    readline.close();
  }
});
